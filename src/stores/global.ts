import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            searchEngineIndex:
                parseInt(localStorage.getItem("searchEngineIndex") || "0", 10),
            shortCuts: JSON.parse(localStorage.getItem("shortCuts") ?? "[]") as {
                name: string;
                url: string;
            }[],
            wallpaperIndex: parseInt(localStorage.getItem("wallpaperIndex") || "0", 10),
        };
    },
});
