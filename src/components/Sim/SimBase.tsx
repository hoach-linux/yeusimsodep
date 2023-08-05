import { FC } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./style.css"

interface ISimProps {
    sim: any;
    openModal: (isVisible: boolean) => void
    updateSimContent: (newSim: any) => void
}

export const SimBase: FC<ISimProps> = ({
    sim,
    openModal,
    updateSimContent,
}) => {
    const providers = {
        mobifone: "b26950bd-e9e5-4d37-a819-76137c3a8bb6",
        viettel: "4bb048f8-5047-44bb-9b3a-c80cb6130e8e",
        vinaphone: "144f315f-37f2-4de1-90d2-4e98af4f9366"
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
            {typeof sim.price === 'number' && <Card sx={{
                minWidth: "100%", borderRadius: "12px", transition: ".2s", "&:hover": {
                    borderRadius: "0px"
                }
            }} className="base-card">
                <CardActionArea
                    sx={{ display: 'flex', justifyContent: "space-around" }}
                    onClick={() => {
                        openModal(true)
                        updateSimContent(sim)
                    }}
                >
                    {sim.provider.toLowerCase().trim() === "mobifone" && <CardMedia
                        className="card-image"
                        component="img"
                        sx={{ borderRadius: "50%" }}
                        image={`https://directus.hoach.skryonline.com/assets/${providers.mobifone}`}
                        alt={sim.provider}
                    />}
                    {sim.provider.toLowerCase().trim() === "viettel" && <CardMedia
                        className="card-image"
                        component="img"
                        sx={{ background: "#fff", borderRadius: "12px" }}
                        image={`https://directus.hoach.skryonline.com/assets/${providers.viettel}`}
                        alt={sim.provider}
                    />}
                    {sim.provider.toLowerCase().trim() === "vinaphone" && <CardMedia
                        className="card-image"
                        sx={{ background: "#fff", borderRadius: "12px" }}
                        component="img"
                        image={`https://directus.hoach.skryonline.com/assets/${providers.vinaphone}`}
                        alt={sim.provider}
                    />}
                    <CardContent sx={{ padding: "16px 5px", width: '120px' }} className="base__card-content">
                        <Typography gutterBottom variant="h6" component="div" className="text">
                            {sim.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="text">
                            {sim.price.toLocaleString("vn")}₫
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="text-hover">
                            Mua sim
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card >
            }
        </motion.div>
    );
}
