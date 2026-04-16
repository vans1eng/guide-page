<template>
    <div
        class="shortcut-item bg-white/70 w-[50px] h-[50px] relative rounded-[10px] flex justify-center items-center hover:bg-white/30 transition duration-300 cursor-pointer mr-2 group">
        <img :src="iconUrl" alt="" class="p-3">
        <div class="shortcut-tooltip-box w-full flex justify-center -translate-y-13 absolute">
            <span
                class="shortcut-tooltip text-nowrap bg-white/50 opacity-0 text-[0.9rem] px-2 rounded-[4px] backdrop-blur-md group-hover:opacity-100 text-white">{{
            props.shortCut.name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<props>()
const iconUrl = `https://${props.shortCut.url.split('//')[1].split('/')[0]}/favicon.ico`
interface props {
    shortCut: {
        name: string,
        url: string
    }
}
</script>