<template>
  <div class="home-page w-full h-full fixed overflow-hidden">
    <div class="bg-shadow absolute z-100 bg-black animate-fade-out pointer-events-none w-full h-full pointer-events-none"></div>
    <img :src="wallpaperUrl"
      :style="{ scale: inputFocus || homeStoreInstance.newShortcutPanelShow ? 1.1 : 1, filter: inputFocus || homeStoreInstance.newShortcutPanelShow ? 'blur(10px)' : 'none' }"
      class="wallpaper absolute z-0 w-full h-full object-cover transition duration-300">
    <div :style="{ backgroundColor: homeStoreInstance.newShortcutPanelShow ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)' }"
      class="content-container relative z-20 flex flex-col w-full h-full items-center bg-black/20">
      <div
        class="wallpaper-btn absolute right-0 top-0 m-4 p-2 rounded-full transition duration-300 hover:bg-black/10  cursor-pointer z-5"
        @click="handleWallpaperBtnClick">
        <svg t="1776267581958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="5900" width="32" height="32">
          <path fill="#2d2d2d"
            d="M170.666667 170.666667h298.666666V85.333333H170.666667C123.52 85.333333 85.333333 123.52 85.333333 170.666667v298.666666h85.333334V170.666667z m256 384l-170.666667 213.333333h512l-128-170.666667-86.613333 115.626667L426.666667 554.666667z m298.666666-192c0-35.413333-28.586667-64-64-64s-64 28.586667-64 64 28.586667 64 64 64 64-28.586667 64-64z m128-277.333334H554.666667v85.333334h298.666666v298.666666h85.333334V170.666667c0-47.146667-38.186667-85.333333-85.333334-85.333334z m0 768H554.666667v85.333334h298.666666c47.146667 0 85.333333-38.186667 85.333334-85.333334V554.666667h-85.333334v298.666666zM170.666667 554.666667H85.333333v298.666666c0 47.146667 38.186667 85.333333 85.333334 85.333334h298.666666v-85.333334H170.666667V554.666667z"
            p-id="5901"></path>
        </svg>
      </div>
      <div class="time-container flex flex-col mt-10 select-none">
        <div class="day-line text-center text-[1.5rem] text-white/80">{{ dateText }}</div>
        <div class="time-line text-center font-bold text-[7rem] text-white/80">{{ timeText }}</div>
      </div>
      <div class="search-container flex justify-center mt-10 z-5">
        <form class="searchInput-box flex relative w-[500px] h-[45px] items-center justify-between"
          @submit.prevent="searchGo">
          <input ref="searchInputEl" type="text" placeholder="搜索" @focus="handleInputFocus" @blur="handleInputBlur"
            class="absolute w-full h-full  shadow-2xl rounded-[45px] text-center outline-none backdrop-blur-[30px] bg-white/10 text-white transition duration-300 hover:bg-white/50 hover:text-black/90 focus:bg-white focus:text-black border-gray-300">
          <div @mousedown.prevent.stop="keepFocus"
            :style="{ opacity: inputFocus ? 1 : 0, pointerEvents: inputFocus ? 'auto' : 'none' }"
            class="searchEngine-box w-[45px] h-[45px] z-1 flex items-center justify-center relative rounded-full hover:cursor-pointer transition duration-300">
            <div
              :style="{ opacity: (searchEngineBtnsShow || globalStoreInstance.searchEngineIndex === 0) ? 1 : 0, transform: `translateY(${searchEngineBtnsShow ? 50 : 0}px)` }"
              class="searchEngine-btn transition duration-300 bg-white/20 hover:bg-white/50 w-full h-full flex justify-center items-center rounded-full hover:cursor-pointer absolute"
              @click="switchSearchEngine(0)">
              <svg t="1776262831792" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2755" width="24" height="24">
                <path
                  d="M184.310244 539.583133c111.396518-23.899253 96.196993-156.995092 92.797099-186.094183-5.499828-44.898596-58.198181-123.296146-129.795943-117.09634C57.214216 244.492357 44.014629 374.688287 44.014629 374.688287c-12.099622 60.198118 29.199087 188.794098 140.295615 164.894846zM302.506549 770.975899c-3.299897 9.399706-10.499672 33.298959-4.299866 54.098309 12.399612 46.69854 52.998343 48.798475 52.998343 48.798475h58.298178V731.377137h-62.398049c-27.999125 8.399737-41.5987 30.299053-44.598606 39.598762z m88.397236-454.485792c61.598074 0 111.196524-70.797787 111.196524-158.295052C502.100309 70.797787 452.50186 0 390.903785 0c-61.398081 0-111.196524 70.797787-111.196524 158.195055 0 87.497265 49.798443 158.295052 111.196524 158.295052z m264.89172 10.399675c82.197431 10.699666 135.095777-77.09759 145.495452-143.595512C811.990622 116.996343 758.992279 39.798756 700.794098 26.599169c-58.298178-13.399581-131.095902 79.997499-137.695695 140.895595-7.899753 74.497671 10.599669 148.795349 92.697102 159.395018z m201.393704 390.787784S729.993186 619.280641 655.795505 512.983964c-100.596855-156.795099-243.592385-92.997093-291.390891-13.299584-47.598512 79.697509-121.796193 130.19593-132.295865 143.495514-10.699666 13.199587-153.595199 90.297177-121.896189 231.192773 31.699009 140.795599 143.195524 138.19568 143.195524 138.19568s82.097434 8.099747 177.394454-13.199587c95.297021-21.199337 177.294458 5.299834 177.294458 5.299834s222.593042 74.497671 283.491138-68.997843c60.798099-143.595511-34.398925-217.993186-34.398925-217.993185zM476.301116 931.270889H331.605639c-62.498046-12.499609-87.397268-55.098278-90.597168-62.39805-3.099903-7.399769-20.79935-41.698697-11.399644-99.996874 26.999156-87.397268 103.996749-93.697071 103.99675-93.697071h76.997593v-94.69704l65.597949 0.999969 0.099997 349.789066z m269.591573-0.999969H579.297896c-64.597981-16.599481-67.597887-62.498046-67.597887-62.498046V683.578631l67.597887-1.099965V847.973493c4.099872 17.59945 26.099184 20.899347 26.099184 20.899346H673.994936V683.578631h71.897753v246.692289z m235.692632-491.784627c0-31.799006-26.399175-127.596011-124.396112-127.596011-98.19693 0-111.296521 90.397174-111.29652 154.295176 0 60.998093 5.199837 146.19543 127.096027 143.395518 121.996186-2.599919 108.596605-138.095683 108.596605-170.094683z"
                  p-id="2756"></path>
              </svg>
            </div>
            <div
              :style="{ opacity: (searchEngineBtnsShow || globalStoreInstance.searchEngineIndex === 1) ? 1 : 0, transform: `translateY(${searchEngineBtnsShow ? 100 : 0}px)` }"
              class="searchEngine-btn transition duration-300 bg-white/20 hover:bg-white/50 w-full h-full flex justify-center items-center rounded-full hover:cursor-pointer absolute"
              @click="switchSearchEngine(1)">
              <svg t="1776263895270" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3762" width="24" height="24">
                <path
                  d="M915.2 448l-4.2-17.8H524V594h231.2c-24 114-135.4 174-226.4 174-66.2 0-136-27.8-182.2-72.6-47.4-46-77.6-113.8-77.6-183.6 0-69 31-138 76.2-183.4 45-45.2 113.2-70.8 181-70.8 77.6 0 133.2 41.2 154 60l116.4-115.8c-34.2-30-128-105.6-274.2-105.6-112.8 0-221 43.2-300 122C144.4 295.8 104 408 104 512s38.2 210.8 113.8 289c80.8 83.4 195.2 127 313 127 107.2 0 208.8-42 281.2-118.2 71.2-75 108-178.8 108-287.6 0-45.8-4.6-73-4.8-74.2z"
                  p-id="3763"></path>
              </svg>
            </div>
          </div>
          <button type="button" :style="{ opacity: inputFocus ? 1 : 0, pointerEvents: inputFocus ? 'auto' : 'none' }"
            @mousedown.prevent.stop="searchGo" class=" search-btn w-[45px] h-[45px] z-1 flex justify-center items-center rounded-full transition duration-300
            hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-search-icon lucide-search z-1">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </button>
        </form>
      </div>
      <NewShortcutPanel />
      <ShortcutBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useGlobalStore } from '../../stores/global'
import { useHomeStore } from '../../stores/home';
import ShortcutBar from './components/ShortcutBar.vue'
import NewShortcutPanel from './components/NewShortcutPanel.vue';
import {
  selectWallpaperFolder,
  restoreFolderPermission,
  nextWallpaper,
  currentWallpaperUrl,
  getWallpaperCount,
} from '../../composables/useWallpaper'
import defaultWallpaper from '../../assets/wallpaper/1.png'

const globalStoreInstance = useGlobalStore()
const homeStoreInstance = useHomeStore()

const inputFocus = ref(false)
const searchEngineBtnsShow = ref(false)
const isFolderSelected = ref(false)

// 壁纸 URL：如果用户选择了文件夹，使用动态壁纸；否则使用默认壁纸
const wallpaperUrl = computed(() => {
  return isFolderSelected.value && currentWallpaperUrl.value 
    ? currentWallpaperUrl.value 
    : defaultWallpaper
})

const timeText = ref(getTimeText())
const dateText = ref(getDateText())

onMounted(async () => {
  setInterval(() => {
    timeText.value = getTimeText()
  }, 1000)

  // 尝试恢复之前保存的文件夹权限
  const restored = await restoreFolderPermission()
  isFolderSelected.value = restored
})

const searchInputEl = ref<HTMLInputElement | null>(null)

// 处理壁纸按钮点击
async function handleWallpaperBtnClick() {
  if (isFolderSelected.value) {
    // 如果已经选择了文件夹，右键或长按可以选择新文件夹
    // 左键切换壁纸
    if (getWallpaperCount() > 1) {
      await nextWallpaper()
    } else {
      // 只有一张图时，询问是否选择新文件夹
      if (confirm('是否要选择新的文件夹来更换壁纸？')) {
        const success = await selectWallpaperFolder()
        isFolderSelected.value = success
      }
    }
  } else {
    // 还没选择过文件夹，打开选择器
    const success = await selectWallpaperFolder()
    isFolderSelected.value = success
  }
}

const keepFocus = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  // 立即把焦点拉回 Input，系统就不会触发 blur
  requestAnimationFrame(() => {
    searchInputEl.value?.focus()
  })
}

function switchSearchEngine(index: number) {
  if (searchEngineBtnsShow.value) {
    globalStoreInstance.searchEngineIndex = index
    localStorage.setItem('searchEngineIndex', index.toString())
    searchEngineBtnsShow.value = false
  }
  else {
    searchEngineBtnsShow.value = true
  }
}

function handleInputFocus() {
  inputFocus.value = true
  console.log('Input focused')
}

function handleInputBlur() {
  inputFocus.value = false
  searchEngineBtnsShow.value = false
  console.log('Input blurred')
}

function getDateText() {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year} - ${month} - ${day}`
}

function getTimeText() {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function searchGo() {
  switch (globalStoreInstance.searchEngineIndex) {
    case 0:
      window.open(`https://www.baidu.com/s?wd=${searchInputEl.value?.value}`)
      break
    case 1:
      window.open(`https://www.google.com/search?q=${searchInputEl.value?.value}`)
      break
    default:
      break
  }
  if (searchInputEl.value) {
    searchInputEl.value.value = ''
  }
}
</script>
