import { motion } from "framer-motion";
import HomeMainContent from "../components/HomeMainContent";
import { Grid } from "@nextui-org/react";
import Sidebar from "../components/Sidebar";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SimList from "../components/SimList";
import { useFetching } from "../hooks/useFetching";
import SimService from "../API/SimService";
import useStore from "../store/useStore";
import { Button, Pagination, Typography } from "@mui/material";
import SkeletonList from "../components/SkeletonList";
import { Helmet } from "react-helmet";

const Home = () => {
    const limit = 24;
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilteredList, setShowFilteredList] = useState(false);
    const [filteredSimList, setFilteredSimList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const page = useStore((state: any) => state.page);
    const pageTitle = useStore((state: any) => state.pageTitle)
    const setPage = useStore((state: any) => state.setPage);
    const [fetchFilteredSim, loading] = useFetching(async () => {
        const response: any = await SimService.getSimFilterPrice(
            searchParams.get("query"),
            page
        );

        setFilteredSimList(response.data);
        setTotalPage(Math.ceil(response.meta.filter_count / limit));
    });
    // const [deleteSim, deleteLoading] = useFetching(async () => {
    //     try {
    //         const sims = await SimService.getSimDelete(10_000, 1);
    //         const simsLength = sims.data.length;
    //         const timeOut = 20_000;

    //         if (simsLength > 0) {
    //             const maxConcurrentRequests = 5; // Определяем максимальное количество одновременных запросов
    //             const chunkedSims = chunkArray(sims.data, maxConcurrentRequests); // Разбиваем массив на части

    //             const deleteTasks = chunkedSims.map((chunk) => {
    //                 return chunk.map((item: any) => {
    //                     // Передаем идентификатор элемента для удаления
    //                     return SimService.deleteSim(item.id);
    //                 });
    //             });

    //             const flatDeleteTasks = deleteTasks.flat();
    //             const results = await Promise.allSettled(flatDeleteTasks);
    //             const resolvedTasks = results
    //                 .filter((result) => result.status === 'fulfilled')
    //                 .map((result: any) => result.value);

    //             // Используем Web Worker для выполнения задач на заднем фоне
    //             if (window.Worker) {
    //                 const workerUrl = new URL("../workers/worker.ts", import.meta.url)
    //                 const worker = new Worker(workerUrl); // Создаем новый Web Worker

    //                 worker.postMessage({ tasks: resolvedTasks }); // Отправляем задачи на выполнение
    //                 worker.onmessage = function (e) {
    //                     console.log(e.data)
    //                     // При завершении всех задач, вызываем функцию deleteSim через setTimeout
    //                     setTimeout(() => {
    //                         deleteSim();
    //                     }, timeOut);
    //                 };
    //             }
    //         }

    //         return;
    //     } catch (error) {
    //         console.log(error)
    //     }

    // });

    // function chunkArray(array: object[], size: number) {
    //     const result = [];
    //     for (let i = 0; i < array.length; i += size) {
    //         result.push(array.slice(i, i + size));
    //     }
    //     return result;
    // }

    useEffect(() => {
        if (searchParams.get("query")) {
            setShowFilteredList(true);
            fetchFilteredSim();
        } else {
            setShowFilteredList(false);
        }
    }, [searchParams, page]);

    function goToSetPage(value: number): void {
        const anchor = document.querySelector('#back-to-top-anchor');

        if (anchor && !loading) {
            anchor.scrollIntoView();
        }

        setPage(value)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            id="back-to-top-anchor"
        >
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            {/* <Button onClick={deleteSim}>Delete</Button> */}
            <Grid.Container gap={1} justify="center">
                <Grid xs={0} sm={3}>
                    <Sidebar />
                </Grid>
                <Grid xs={12} sm={9} >
                    {showFilteredList && !loading ? (
                        <div style={{ minWidth: "100%" }}>
                            {filteredSimList.length === 0 && !loading && (
                                <Typography variant="h4" sx={{ textAlign: "center", mb: "15px" }} >
                                    Không tìm thấy thẻ sim
                                </Typography>
                            )}
                            <SimList
                                sims={filteredSimList}
                                title={searchParams.get("query")}
                            />
                            {totalPage > 1 && (
                                <Pagination
                                    sx={{
                                        zIndex: "1",
                                        borderRadius: "12px",
                                        padding: "12px 0",
                                        maxWidth: "fit-content"
                                    }}
                                    className="pagination"
                                    page={page}
                                    color="primary"
                                    onChange={(e, value: number) => goToSetPage(value)}
                                    count={totalPage}
                                />
                            )}
                        </div>
                    ) : loading ? (
                        <div style={{ minWidth: "100%" }}>
                            <SkeletonList />
                        </div>
                    ) : (
                        <HomeMainContent />
                    )}
                </Grid>
            </Grid.Container>
        </motion.div>
    );
};

export default Home;
