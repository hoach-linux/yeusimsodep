import * as React from "react";
import { Grid } from "@nextui-org/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, Home, Phone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useFetching } from "../hooks/useFetching";
import supabase from "../supabase";
import Sim from "./Sim/Sim";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface ISim {
    number: string;
    price: string;
    provider: string;
}

const SimList = ({ sims, title }: { sims: any; title: any }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const openSnackbar = () => setShowSnackbar(true);
    const closeSnackbar = () => setShowSnackbar(false);
    const [simsList, setSimsList] = useState([])
    const simsMemo = useMemo(() => {
        return simsList
    }, [simsList])
    const [simContent, setSimContent] = useState<ISim>(null as any)
    const updateSimList = useCallback((simList: any) => {
        setSimsList(simList)
    }, [])
    const providers = {
        mobifone: "b26950bd-e9e5-4d37-a819-76137c3a8bb6",
        viettel: "4bb048f8-5047-44bb-9b3a-c80cb6130e8e",
        vinaphone: "144f315f-37f2-4de1-90d2-4e98af4f9366"
    };
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(false);
    const [orderData, setOrderData] = useState({
        name: "",
        address: "",
        numberPhone: "",
        sim: '' as any,
        status: "active",
    });
    const [showRequired, setShowRequired] = useState(false);
    const theme: Theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [orderingSim, orderLoading] = useFetching(async () => {
        const { data, error } = await supabase.from("orders").insert([orderData]);
    });
    const openModal = useCallback((isVisible: boolean) => {
        setVisible(isVisible)
    }, []);
    const closeModal = () => {
        setVisible(false);
        setShowRequired(false)

        setOrderData(prevData => ({
            ...prevData,
            name: "",
            address: "",
            numberPhone: "",
        }));
    }
    const updateSimContent = useCallback((newSim: any) => {
        setSimContent(newSim)
    }, [])
    const requiredConditions =
        orderData.name.length >= 1 &&
        orderData.address.length >= 1 &&
        orderData.numberPhone.length >= 1;
    const order = async () => {
        if (requiredConditions) {
            setDisable(true);

            await orderingSim();

            orderData.name = ""
            orderData.address = ""
            orderData.numberPhone = ""

            setVisible(false)
            setDisable(false);
            openSnackbar();
        } else {
            setShowRequired(true);
        }
    };
    useEffect(() => {
        if (requiredConditions) {
            setShowRequired(false);
        }
    }, [orderData]);
    useEffect(() => {
        setSimsList(
            sims.map((sim: any) => {
                if (sim.number[0] !== '0') {
                    sim.number = '0' + sim.number
                }
                return sim
            })
        )
    }, [sims])
    useEffect(() => {
        setOrderData({ ...orderData, sim: simContent })
    }, [simContent])

    return (
        <div>
            {sims.length > 0 && (
                <div>
                    <Typography variant="h3" sx={{ textAlign: "center", mb: "15px" }} >
                        {title}
                    </Typography>
                    <Grid.Container
                        gap={0.6}
                        justify="flex-start"
                        css={{
                            marginBottom: "62px",
                            padding: 0,
                        }}
                    >
                        {simsMemo.map((sim: ISim, index: number) => (
                            <Grid xs={6} sm={3} key={index}>
                                <Sim
                                    sim={sim}
                                    updateSimList={updateSimList}
                                    openModal={openModal}
                                    updateSimContent={updateSimContent}
                                />
                            </Grid>
                        ))}
                    </Grid.Container>
                </div>
            )}
            <Dialog open={visible} onClose={closeModal} fullWidth fullScreen={fullScreen}>
                <DialogTitle>Mua sim</DialogTitle>
                <DialogContent>
                    {simContent !== null &&
                        <Card sx={{
                            minWidth: "100%", borderRadius: "12px", transition: ".2s", "&:hover": {
                                borderRadius: "0px"
                            }
                        }}>
                            <CardActionArea
                                onClick={() => setVisible(false)}
                            >
                                {simContent.provider.toLowerCase().trim() === "mobifone" && <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://directus.hoach.skryonline.com/assets/${providers.mobifone}`}
                                    alt={simContent.provider}
                                />}
                                {simContent.provider.toLowerCase().trim() === "viettel" && <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://directus.hoach.skryonline.com/assets/${providers.viettel}`}
                                    alt={simContent.provider}
                                />}
                                {simContent.provider.toLowerCase().trim() === "vinaphone" && <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://directus.hoach.skryonline.com/assets/${providers.vinaphone}`}
                                    alt={simContent.provider}
                                />}
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {simContent.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {simContent.price.toLocaleString()}₫
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    }
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField
                            variant="standard"
                            margin="dense"
                            fullWidth
                            autoFocus
                            label="Họ tên"
                            required
                            onChange={(e) =>
                                setOrderData({ ...orderData, name: e.target.value })
                            }
                            error={showRequired && orderData.name.length < 1}
                            helperText={showRequired && orderData.name.length < 1 && <>Bạn quên viết: Họ tên</>}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Home sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField
                            variant="standard"
                            margin="dense"
                            fullWidth
                            label="Địa chỉ"
                            required
                            onChange={(e) =>
                                setOrderData({ ...orderData, address: e.target.value })
                            }
                            error={showRequired && orderData.address.length < 1}
                            helperText={showRequired && orderData.address.length < 1 && <>Bạn quên viết: Địa chỉ</>}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Phone sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField
                            variant="standard"
                            margin="dense"
                            fullWidth
                            label="Điện thoại"
                            required
                            onChange={(e) =>
                                setOrderData({ ...orderData, numberPhone: e.target.value })
                            }
                            type="number"
                            error={showRequired && orderData.numberPhone.length < 1}
                            helperText={showRequired && orderData.numberPhone.length < 1 && <>Bạn quên viết: Điện thoại</>}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="error">Đóng</Button>
                    <LoadingButton onClick={order} loading={orderLoading} variant="contained">Mua</LoadingButton>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert
                    onClose={closeSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Đặt sim thành công. Chúng tôi sẽ sớm liên lạc lại với bạn
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SimList;
