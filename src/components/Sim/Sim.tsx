import "./style.css"
import { useLocation } from "react-router-dom";
import { SimBase } from "./SimBase";
import SimDelete from "./SimDelete";
import React, { FC } from "react";

interface ISimProps {
    sim: any;
    updateSimList: (simList: any) => void
    openModal: (isVisible: boolean) => void
    updateSimContent: (newSim: any) => void
}

const Sim: FC<ISimProps> = ({
    sim,
    updateSimList,
    openModal,
    updateSimContent,
}) => {

    const location = useLocation()

    if (location.pathname === '/') {
        return (
            <SimBase
                sim={sim}
                updateSimContent={updateSimContent}
                openModal={openModal}
            />
        )
    }
    if (location.pathname === '/admin/delete_sim') {
        return (
            <SimDelete sim={sim} updateSimList={updateSimList} />
        )
    }
}

export default React.memo(Sim)