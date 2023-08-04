import "./style.css"
import { useLocation } from "react-router-dom";
import SimBase from "./SimBase";
import SimDelete from "./SimDelete";

export default function Sim({
    sim,
    updateSimList,
    openSnackbar,
}: {
    sim: any;
    updateSimList: (simList: any) => void
    openSnackbar: any;
}) {

    const location = useLocation()

    if (location.pathname === '/') {
        return (
            <SimBase sim={sim} openSnackbar={openSnackbar} />
        )
    }
    if (location.pathname === '/admin/delete_sim') {
        return (
            <SimDelete sim={sim} updateSimList={updateSimList} openSnackbar={openSnackbar} />
        )
    }
}
