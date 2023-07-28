import Header from "./Header/Header";
import SimList from "./SimList";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import SimService from "../API/SimService";
import SkeletonList from "./SkeletonList";

const HomeMainContent = () => {
    const [searchInputLength, setSearchInputLength] = useState('')
    const [sims, setSims] = useState([]);
    const [mobifone, setMobifone] = useState([]);
    const [fetchSims, simsLoading] = useFetching(async () => {
        const response: any = await SimService.getSimFilterPrice("Sim 10 - 20 triệu", 1)

        setSims(response.data);
    });

    const [fetchMobifone, mobifoneLoading] = useFetching(async () => {
        const response: any = await SimService.getSimByProvider(
            16,
            1,
            "Mobifone"
        );

        setMobifone(response.data);
    });

    useEffect(() => {
        fetchSims();
        fetchMobifone();
    }, []);

    function changeSearchInput(input: string): void {
        setSearchInputLength(input)
    }

    return (
        <div style={{ minWidth: "100%" }}>
            <Header changeSearchInput={changeSearchInput} />
            {simsLoading ? (
                <SkeletonList />
            ) : (
                <>
                    {searchInputLength.length < 1 && <SimList sims={sims} title="Sim số đẹp" />}
                </>
            )}
            {
                mobifoneLoading ? (
                    <SkeletonList />
                ) : (

                    <>
                        {searchInputLength.length < 1 && <SimList sims={mobifone} title="Mobifone" />}
                    </>
                )
            }
        </div >
    );
};

export default HomeMainContent;
