import { useState, useEffect, lazy } from "react";
import { useFetching } from "../../hooks/useFetching";
import supabase from "../../supabase";
import { Card, Box, Button, CardActionArea, CardContent, CardMedia, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AccountCircle, Home, Phone } from "@mui/icons-material"
import { motion } from "framer-motion";
import { useTheme } from '@mui/material/styles';
import "./style.css"
import SimService from "../../API/SimService";

export default function SimDelete({
    sim,
    updateSimList
}: {
    sim: any;
    updateSimList: (simList: any) => void
}) {
    console.log(sim)
    const providers = {
        mobifone: "b26950bd-e9e5-4d37-a819-76137c3a8bb6",
        viettel: "4bb048f8-5047-44bb-9b3a-c80cb6130e8e",
        vinaphone: "144f315f-37f2-4de1-90d2-4e98af4f9366"
    };
    const [visible, setVisible] = useState(false);
    const [disable, setDisable] = useState(false);
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const directusToken = localStorage.getItem("directus_token")
    let directusAccessToken: string

    if (directusToken !== null) {
        directusAccessToken = JSON.parse(directusToken).access_token
    }

    const [deletingSim, deleteLoading] = useFetching(async () => {
        await SimService.deleteSim(sim.id, directusAccessToken)
    });
    const openModal = () => setVisible(!visible);
    const closeModal = () => setVisible(false);
    const deleteSim = async () => {
        setDisable(true);

        await deletingSim();

        updateSimList([])

        closeModal();
        setDisable(false);
    };

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
                    sx={{ display: 'flex', justifyContent: "space-around" }}
                    onClick={openModal}
                >
                    {sim?.provider.toLowerCase().trim() === "mobifone" && <CardMedia
                        className="card-image"
                        component="img"
                        sx={{ borderRadius: "50%" }}
                        image={`https://directus.hoach.skryonline.com/assets/${providers.mobifone}`}
                        alt={sim?.provider}
                    />}
                    {sim?.provider.toLowerCase().trim() === "viettel" && <CardMedia
                        className="card-image"
                        component="img"
                        sx={{ background: "#fff", borderRadius: "12px" }}
                        image={`https://directus.hoach.skryonline.com/assets/${providers.viettel}`}
                        alt={sim?.provider}
                    />}
                    {sim?.provider.toLowerCase().trim() === "vinaphone" && <CardMedia
                        className="card-image"
                        sx={{ background: "#fff", borderRadius: "12px" }}
                        component="img"
                        image={`https://directus.hoach.skryonline.com/assets/${providers.vinaphone}`}
                        alt={sim?.provider}
                    />}
                    <CardContent sx={{ padding: "16px 5px", width: '120px' }}>
                        <Typography gutterBottom variant="h6" component="div">
                            {sim.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {sim?.price.toLocaleString("vn")}₫
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Dialog open={visible} onClose={closeModal} fullWidth>
                    <DialogTitle id="alert-dialog-title">
                        {"Bạn có thực sự muốn xóa sim không?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={closeModal} color="error">Đóng</Button>
                        <LoadingButton onClick={deleteSim} loading={deleteLoading}>Xóa</LoadingButton>
                    </DialogActions>
                </Dialog>
            </Card >
        </motion.div>
    );
}
