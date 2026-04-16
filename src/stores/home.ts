import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
    state: () => {
        return {
            shortCuts:localStorage.getItem("shortCuts") ? JSON.parse(localStorage.getItem("shortCuts") as string) : [],
            newShortcutPanelShow: false,
        };
    },
});
