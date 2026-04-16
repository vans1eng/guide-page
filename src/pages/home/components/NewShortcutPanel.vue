<template>
  <div :style="{ zIndex: homeStoreInstance.newShortcutPanelShow ? 10 : 0 }"
    class="newShortcut-page absolute top-0 left-0 w-full h-full flex justify-center items-center z-10"
    @click="handleClosePanel">
    <div
      :style="{ scale: homeStoreInstance.newShortcutPanelShow ? 1 : 0, opacity: homeStoreInstance.newShortcutPanelShow ? 1 : 0 }"
      class="newShortcut-panel w-[800px] h-[500px] transition duration-300  bg-white/50 backdrop-blur-[30px] rounded-[10px] p-5 my-10 translate-y-10 flex flex-col"
      @click.stop>
      <div class="newShortcut-panel-header text-[1.2rem] font-bold mb-5 text-white/80">新建快捷方式</div>
      <div class="newShortcut-panel-body flex flex-col flex-1 justify-between">
        <div class="flex flex-col">
          <input ref="shortcutNameInputEl" type="text" placeholder="请输入名称"
            class="w-full mb-3 p-2 rounded-md border bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input ref="shortcutUrlInputEl" type="text" placeholder="请输入链接"
            class="w-full mb-3 p-2 rounded-md border bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          @click="newShortcut">保存</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useHomeStore } from '../../../stores/home';

const homeStoreInstance = useHomeStore()
const shortcutNameInputEl = ref<HTMLInputElement | null>(null)
const shortcutUrlInputEl = ref<HTMLInputElement | null>(null)

function handleClosePanel() {
  homeStoreInstance.newShortcutPanelShow = false
}

function newShortcut() {
  const name = shortcutNameInputEl.value?.value.trim()
  const url = shortcutUrlInputEl.value?.value.trim()
  if (name && url) {
    // 在这里可以将新的快捷方式保存到状态管理或发送到后端
    console.log('新建快捷方式:', { name, url })
    homeStoreInstance.newShortcutPanelShow = false
    homeStoreInstance.shortCuts.push({ name, url })
    localStorage.setItem('shortCuts', JSON.stringify(homeStoreInstance.shortCuts))
    if (shortcutNameInputEl.value) shortcutNameInputEl.value.value = ''
    if (shortcutUrlInputEl.value) shortcutUrlInputEl.value.value = ''
  } else {
    alert('请填写完整的名称和链接')
  }
}
</script>