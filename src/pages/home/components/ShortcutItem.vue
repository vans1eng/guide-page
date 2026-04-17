<template>
    <div
        class="shortcut-item bg-white/70 w-[50px] h-[50px] relative rounded-[10px] flex justify-center items-center hover:bg-white/30 transition duration-300 cursor-pointer mr-2 group">
        <img :src="iconUrl" alt="" class="p-3">
        <div class="shortcut-tooltip-box w-full flex justify-center -translate-y-13 absolute">
            <span
                class="shortcut-tooltip text-nowrap bg-white/50 opacity-0 text-[0.9rem] px-2 rounded-[4px] backdrop-blur-md group-hover:opacity-100 text-white">{{
            props.shortCut.name }}</span>
        </div>
        <div class="shortcut-delete-btn absolute w-[16px] h-[16px] scale-0 bg-red-600 hover:bg-red-800 rounded-full flex transition duration-100 justify-center items-center group-hover:scale-100 top-[-5px] right-[-5px] cursor-pointer"
            @click="deleteShortcut" @click.stop>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-x-icon lucide-x">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '../../../stores/home';
const homeStoreInstance = useHomeStore()
const props = defineProps<props>()
const iconUrl = `https://${props.shortCut.url.split('//')[1].split('/')[0]}/favicon.ico`
interface props {
    shortCut: {
        name: string,
        url: string
    }
}

function deleteShortcut() {
    homeStoreInstance.shortCuts = homeStoreInstance.shortCuts.filter(
        (item: { name: string, url: string }) => item.url !== props.shortCut.url
    )
    localStorage.setItem("shortCuts", JSON.stringify(homeStoreInstance.shortCuts))
}
</script>