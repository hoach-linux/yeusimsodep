import Header from "./Header/Header";
import SimList from "./SimList";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import SimService from "../API/SimService";
import SkeletonList from "./SkeletonList";
import { Information } from "./Information/Information";

const HomeMainContent = () => {
    const [searchInputLength, setSearchInputLength] = useState('')
    const [sims, setSims] = useState([]);
    const [mobifone, setMobifone] = useState([]);
    const [fetchSims, simsLoading] = useFetching(async () => {
        const response: any = await SimService.getSim(100, 1)

        setSims(response.data);
    });

    useEffect(() => {
        fetchSims();
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
                    {searchInputLength.length < 1 && <>
                        <SimList sims={sims} title="Sim số đẹp" />
                        <Information />
                    </>}

                </>
            )}
        </div>
    );
};

export default HomeMainContent;
