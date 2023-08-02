import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import axios from "axios";
import { CircularProgressWithLabel } from "../../components/CircularProgressWithLabel";
import SimService from "../../API/SimService";
import { LoadingButton } from "@mui/lab";
import { useCheckingRegister } from "../../hooks/useCheckingRegister";
import { useNavigate } from "react-router-dom";

interface IFile {
    size: number | string
    name: string
}

export function UpSim() {
    const [sims, setSims] = useState<object[] | string>([])
    const [disableButton, setDisableButton] = useState<boolean>(true)
    const [file, setFile] = useState<IFile | null>(null)
    const [isBackdrop, setIsBackdrop] = useState(false);
    const [progress, setProgress] = useState(0);
    const [workerFinished, setWorkerFinished] = useState<boolean>(false)
    const [checkRegister] = useCheckingRegister("/admin/login");
    const [isDialog, setIsDialog] = useState<boolean>(false)
    const getDirectusToken = localStorage.getItem('directus_token')
    const navigate = useNavigate()
    let access_token: string

    if (getDirectusToken !== null) {
        access_token = JSON.parse(getDirectusToken)?.access_token
    } else {
        navigate('/admin/loading')
    }

    const closeBackdrop = () => {
        setIsBackdrop(false);
    };
    const openBackdrop = () => {
        setIsBackdrop(true);
    };
    const closeDialog = () => {
        setIsDialog(false);
    };
    const openDialog = () => {
        setIsDialog(true);
    };
    const [addSim] = useFetching(async () => {
        let deletingSims = sims
        let maxIteration = Math.ceil(deletingSims.length / 100)

        for (let i = 0; i <= maxIteration; ++i) {
            const newSims = deletingSims.slice(0, 100)

            if (typeof (deletingSims) === 'object') {
                deletingSims = deletingSims.slice(100)

                await axios.post('https://directus.hoach.skryonline.com/items/yeusimsodep', newSims, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            }

            setProgress(() => findPercent(i, sims.length))
        }
    })
    const [deleteSim, deleteLoading, error] = useFetching(async () => {
        const sims = await SimService.getSimDelete(10_000, 1);
        const simsLength = sims.data.length;
        const timeOut = 20_000;

        if (simsLength > 0) {
            openDialog()

            const maxConcurrentRequests = 5; // Определяем максимальное количество одновременных запросов
            const chunkedSims = chunkArray(sims.data, maxConcurrentRequests); // Разбиваем массив на части

            const deleteTasks = chunkedSims.map((chunk) => {
                return chunk.map((item: any) => {
                    // Передаем идентификатор элемента для удаления
                    return SimService.deleteSim(item.id, access_token);
                });
            });

            const flatDeleteTasks = deleteTasks.flat();
            const results = await Promise.allSettled(flatDeleteTasks);
            const resolvedTasks = results
                .filter((result) => result.status === 'fulfilled')
                .map((result: any) => result.value);

            // Используем Web Worker для выполнения задач на заднем фоне
            if (window.Worker) {
                const workerUrl = new URL("../../workers/worker.ts", import.meta.url)
                const worker = new Worker(workerUrl); // Создаем новый Web Worker

                worker.postMessage({ tasks: resolvedTasks }); // Отправляем задачи на выполнение
                worker.onmessage = function (e) {
                    console.log(e.data)
                    // При завершении всех задач, вызываем функцию deleteSim через setTimeout
                    setTimeout(() => {
                        deleteSim();
                    }, timeOut);
                };
            }

            closeDialog()
        }

        return
    });
    async function upSim() {
        if (!workerFinished) return

        setProgress(0)
        setDisableButton(true)
        openBackdrop()

        await addSim()

        closeBackdrop()
        setWorkerFinished(false)
        setSims([])
        setFile(null)
    }
    function chunkArray(array: object[], size: number) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }
    function findPercent(iterationNumber: number, arrLength: number) {
        return Math.floor(100 / arrLength * iterationNumber * 100)
    }
    const xlsxToJson = (e: any) => {
        setDisableButton(true)
        openBackdrop()
        setWorkerFinished(false)

        const file = e.target.files[0]
        const reader = new FileReader()

        setFile(file)

        reader.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workerUrl = new URL("../../workers/upSimsWorker.js", import.meta.url)
            const worker = new Worker(workerUrl)

            worker.postMessage({ data: data })
            worker.onmessage = (e: MessageEvent<object>) => {
                const data = e.data as object[] | string

                if (data === 'finished' && typeof data === 'string') {
                    setWorkerFinished(true)
                } else {
                    setSims(data)
                }
            }
        }
        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        checkRegister();
    }, []);
    useEffect(() => {
        if (!workerFinished) return
        closeBackdrop()
        setDisableButton(false)

        if (!deleteLoading) return
        setDisableButton(true)
    }, [sims, deleteLoading])
    useEffect(() => {
        if (file === null) return
        if (typeof file.size !== 'number') return

        if (file.size >= 1000 && file.size < 1_000_000) {
            const newFile = `${Math.floor(file.size / 1000)} KB`

            setFile({ ...file, size: newFile })
        } else if (file.size >= 1_000_000) {
            const newFile = `${Math.floor(file.size / 1_000_000)} MB`

            setFile({ ...file, size: newFile })
        }
    }, [file?.size])

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "calc(100vh - 76px)", flexDirection: "column" }}>
            <Box sx={{ p: 2, border: '1px dashed grey', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <label htmlFor="upload-file">
                    <Button component="span">
                        Chọn bảng sim
                    </Button>
                    <input
                        id="upload-file"
                        name="upload-file"
                        type="file"
                        hidden
                        onChange={xlsxToJson}
                        accept=".xlsx"
                    />
                </label>
                {file &&
                    <Alert severity="info" sx={{ mt: '10px' }}>
                        kích cỡ: {file.size}
                    </Alert>
                }
            </Box>
            <Box sx={{ marginTop: "10px" }}>
                <Stack direction="row" spacing={2}>
                    <LoadingButton size="large" variant="outlined" color="error" onClick={openDialog}>
                        Xóa bảng sim cũ
                    </LoadingButton>
                    <Button size="large" variant="contained" disabled={disableButton} onClick={upSim} >
                        Up bảng sim
                    </Button>
                </Stack>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackdrop}
            >
                {!workerFinished ?
                    <CircularProgress color="inherit" /> :
                    <CircularProgressWithLabel value={progress} />
                }
            </Backdrop>
            <Dialog
                open={isDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có thực sự muốn xóa bảng sim cũ không?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={deleteLoading}>
                        {deleteLoading ? <>Đang xóa bảng sim cũ</> : <>Không đồng ý</>}
                    </Button>
                    <LoadingButton onClick={deleteSim} autoFocus loading={deleteLoading}>
                        Đồng ý
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box >
    )
}