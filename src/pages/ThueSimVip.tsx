import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const ThueSim = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: "15px" }} >
        Thuê Sim VIP
      </Typography>
    </motion.div>
  );
};

export default ThueSim;
