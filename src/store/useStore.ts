import { create } from "zustand";

const useStore = create((set) => ({
    page: 1,
    mode: window.localStorage.getItem("data-theme") || "light",
    pageTitle: '',
    setPage: (page: number) =>
        set((state: any) => ({ page: (state.page = page) })),
    resetPage: () => set((state: any) => ({ page: (state.page = 1) })),
    darkMode: () => set((state: any) => ({ mode: (state.mode = "dark") })),
    lightMode: () => set((state: any) => ({ mode: (state.mode = "light") })),
    setPageTitle: (pageTitle: string) => set((state: any) => ({ state: state.pageTitle = pageTitle }))
}));

export default useStore;
