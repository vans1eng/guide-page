<template>
    <div class="shortcut-bar flex bg-white/50 p-2 rounded-xl mb-5 backdrop-blur-md absolute bottom-0">
        <ShortcutItem v-for="(shortCut, index) in homeStoreInstance.shortCuts" :key="index" @click="openShortcut(shortCut)" :short-cut="shortCut"/>
        <div class="new-shortcut-box bg-white/70 w-[50px] h-[50px] relative rounded-[10px] flex justify-center items-center hover:bg-white/30 transition duration-300 cursor-pointer group"
            @click="openNewShortcutPanel">
            <svg t="1776268207175" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="7072" width="32" height="32">
                <path
                    d="M835.736 553.375 552.454 553.375l0 283.282-80.938 0L471.516 553.375 188.235 553.375l0-80.934 283.282 0L471.517 189.155l80.938 0 0 283.286 283.282 0L835.737 553.375z"
                    fill="#a2a2a2" p-id="7073"></path>
            </svg>
            <div class="shortcut-tooltip-box w-full flex justify-center -translate-y-13 absolute">
                <div
                    class="shortcut-tooltip bg-white/50 backdrop-blur-md opacity-0 text-[0.9rem] px-2 rounded-[4px] group-hover:opacity-100 text-white">
                    新建</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ShortcutItem from './ShortcutItem.vue';
import { useHomeStore } from '../../../stores/home';

const homeStoreInstance = useHomeStore()

function openNewShortcutPanel() {
    homeStoreInstance.newShortcutPanelShow = true
}

function openShortcut(shortCut: { name: string, url: string }) {
    window.open(shortCut.url, '_blank')
}
</script>