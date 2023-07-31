import { Alert, Backdrop, Box, Button, CircularProgress, } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import axios from "axios";
import { CircularProgressWithLabel } from "../../components/CircularProgressWithLabel";

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
    const closeBackdrop = () => {
        setIsBackdrop(false);
    };
    const openBackdrop = () => {
        setIsBackdrop(true);
    };
    const [upSim] = useFetching(async () => {
        try {
            if (!workerFinished) return

            setProgress(0)
            setDisableButton(!disableButton)
            openBackdrop()

            let deletingSims = sims
            let maxIteration = Math.ceil(deletingSims.length / 100)

            for (let i = 0; i <= maxIteration; ++i) {
                const newSims = deletingSims.slice(0, 100)

                if (typeof (deletingSims) === 'object') {
                    deletingSims = deletingSims.slice(100)

                    await axios.post('https://directus.hoach.skryonline.com/items/yeusimsodep', newSims)
                }

                setProgress(() => findPercent(i, sims.length))
            }

            closeBackdrop()
            setSims([])
            setFile(null)
        } catch (error) {
            console.log(error)
        }
    })
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
        if (workerFinished) {
            setDisableButton(false)
            closeBackdrop()
        }
    }, [sims])
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
                <Button size="large" variant="contained" disabled={disableButton} onClick={upSim}>
                    Up bảng sim
                </Button>
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
        </Box >
    )
}