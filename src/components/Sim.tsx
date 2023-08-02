import { useState, useEffect, lazy } from "react";
import { useFetching } from "../hooks/useFetching";
import supabase from "../supabase";
import { Card, Box, Button, CardActionArea, CardContent, CardMedia, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AccountCircle, Home, Phone } from "@mui/icons-material"
import { motion } from "framer-motion";
import { useTheme } from '@mui/material/styles';

export default function Sim({
    sim,
    openSnackbar,
}: {
    sim: any;
    openSnackbar: any;
}) {
    const [provider, setProvider] = useState(sim.provider.toLowerCase().trim());
    const providers = {
        mobifone: "b26950bd-e9e5-4d37-a819-76137c3a8bb6",
        viettel: "4bb048f8-5047-44bb-9b3a-c80cb6130e8e",
    };
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(false);
    const [orderData, setOrderData] = useState({
        name: "",
        address: "",
        numberPhone: "",
        sim: sim,
        status: "active",
    });
    const [showRequired, setShowRequired] = useState(false);
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [orderingSim, orderLoading] = useFetching(async () => {
        const { data, error } = await supabase.from("orders").insert([orderData]);
    });
    const openModal = () => setVisible(!visible);
    const closeModal = () => setVisible(false);
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

            closeModal();
            setDisable(false);
            openSnackbar(true);
        } else {
            setShowRequired(true);
        }
    };
    useEffect(() => {
        if (requiredConditions) {
            setShowRequired(false);
        }
    }, [orderData]);

    return (
        <motion.div
            initial={{ scale: 0, }}
            animate={{ scale: 1, }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 30
            }}
            style={{ minWidth: "100%" }}
        >
            <Card sx={{
                minWidth: "100%", borderRadius: "12px", transition: ".2s", "&:hover": {
                    borderRadius: "0px"
                }
            }}>
                <CardActionArea
                    onClick={openModal}
                >
                    <CardMedia
                        component="img"
                        height="80"
                        image={`https://directus.hoach.skryonline.com/assets/${providers.mobifone}`}
                        alt={sim.provider}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {sim.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {sim.price.toLocaleString("vn")}₫
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Dialog open={visible} onClose={closeModal} fullWidth fullScreen={fullScreen}>
                    <DialogTitle>Mua sim</DialogTitle>
                    <DialogContent>
                        <Card sx={{
                            minWidth: "100%", borderRadius: "12px", transition: ".2s", "&:hover": {
                                borderRadius: "0px"
                            }
                        }}>
                            <CardActionArea
                                onClick={openModal}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://directus.hoach.skryonline.com/assets/${providers.mobifone}`}
                                    alt={sim.provider}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {sim.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {sim.price.toLocaleString("vn")}₫
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
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
                        <LoadingButton onClick={order} loading={orderLoading}>Mua</LoadingButton>
                    </DialogActions>
                </Dialog>
            </Card >
        </motion.div>
    );
}
