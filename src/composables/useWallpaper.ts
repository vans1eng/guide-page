import { ref, type Ref } from 'vue'

// 存储用户授权的文件夹句柄
let folderHandle: FileSystemDirectoryHandle | null = null

// 存储文件夹中的所有图片文件
const wallpaperFiles: Ref<FileSystemFileHandle[]> = ref([])

// 当前壁纸索引
const currentWallpaperIndex = ref(0)

// 当前壁纸的 URL（用于显示）
const currentWallpaperUrl = ref('')

// 检查浏览器是否支持 File System Access API
function isFileSystemAccessSupported(): boolean {
    return 'showDirectoryPicker' in window
}

// 选择壁纸文件夹
async function selectWallpaperFolder(): Promise<boolean> {
    if (!isFileSystemAccessSupported()) {
        alert('您的浏览器不支持选择文件夹功能，请使用 Chrome 或 Edge 浏览器')
        return false
    }

    try {
        // 打开文件夹选择器
        const handle = await (window as any).showDirectoryPicker({
            mode: 'read',
        })
        
        folderHandle = handle
        await loadWallpaperFiles()
        
        // 保存文件夹权限（用户下次访问时不需要重新授权）
        await saveFolderPermission()
        
        return true
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('选择文件夹失败:', error)
            alert('选择文件夹失败: ' + (error as Error).message)
        }
        return false
    }
}

// 加载文件夹中的所有图片文件
async function loadWallpaperFiles(): Promise<void> {
    if (!folderHandle) return

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']
    const files: FileSystemFileHandle[] = []

    // 遍历文件夹中的所有文件
    for await (const entry of (folderHandle as any).values()) {
        if (entry.kind === 'file') {
            const name = entry.name.toLowerCase()
            const ext = name.substring(name.lastIndexOf('.'))
            if (imageExtensions.includes(ext)) {
                files.push(entry)
            }
        }
    }

    // 按文件名排序
    files.sort((a, b) => a.name.localeCompare(b.name))

    wallpaperFiles.value = files
    
    // 加载当前索引的壁纸
    if (files.length > 0) {
        const savedIndex = parseInt(localStorage.getItem('wallpaperIndex') || '0', 10)
        currentWallpaperIndex.value = Math.min(savedIndex, files.length - 1)
        await loadWallpaperByIndex(currentWallpaperIndex.value)
    }
}

// 根据索引加载壁纸
async function loadWallpaperByIndex(index: number): Promise<void> {
    if (index < 0 || index >= wallpaperFiles.value.length) return

    const fileHandle = wallpaperFiles.value[index]
    const file = await fileHandle.getFile()
    const url = URL.createObjectURL(file)
    
    // 释放旧的 URL
    if (currentWallpaperUrl.value) {
        URL.revokeObjectURL(currentWallpaperUrl.value)
    }
    
    currentWallpaperUrl.value = url
    currentWallpaperIndex.value = index
    localStorage.setItem('wallpaperIndex', index.toString())
}

// 切换到下一张壁纸
async function nextWallpaper(): Promise<void> {
    if (wallpaperFiles.value.length === 0) return
    
    const newIndex = (currentWallpaperIndex.value + 1) % wallpaperFiles.value.length
    await loadWallpaperByIndex(newIndex)
}

// 切换到上一张壁纸
async function previousWallpaper(): Promise<void> {
    if (wallpaperFiles.value.length === 0) return
    
    const newIndex = (currentWallpaperIndex.value - 1 + wallpaperFiles.value.length) % wallpaperFiles.value.length
    await loadWallpaperByIndex(newIndex)
}

// 保存文件夹权限到 IndexedDB
async function saveFolderPermission(): Promise<void> {
    if (!folderHandle) return

    try {
        const db = await openPermissionDB()
        const tx = db.transaction('permissions', 'readwrite')
        const store = tx.objectStore('permissions')
        store.put(folderHandle, 'wallpaperFolder')
        await new Promise<void>((resolve, reject) => {
            tx.oncomplete = () => resolve()
            tx.onerror = () => reject(tx.error)
        })
    } catch (error) {
        console.error('保存权限失败:', error)
    }
}

// 从 IndexedDB 恢复文件夹权限
async function restoreFolderPermission(): Promise<boolean> {
    try {
        const db = await openPermissionDB()
        const tx = db.transaction('permissions', 'readonly')
        const store = tx.objectStore('permissions')
        const request = store.get('wallpaperFolder')
        
        return new Promise((resolve) => {
            request.onsuccess = async () => {
                const handle = request.result
                if (handle) {
                    // 检查权限是否仍然有效
                    try {
                        // 尝试访问文件夹以验证权限
                        await (handle as any).values().next()
                        folderHandle = handle
                        await loadWallpaperFiles()
                        resolve(true)
                    } catch {
                        // 权限已失效
                        resolve(false)
                    }
                } else {
                    resolve(false)
                }
            }
            request.onerror = () => resolve(false)
        })
    } catch {
        return false
    }
}

// 打开 IndexedDB
function openPermissionDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('wallpaper-permissions', 1)
        
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
        
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains('permissions')) {
                db.createObjectStore('permissions')
            }
        }
    })
}

// 获取壁纸数量
function getWallpaperCount(): number {
    return wallpaperFiles.value.length
}

// 获取当前壁纸索引
function getCurrentWallpaperIndex(): number {
    return currentWallpaperIndex.value
}

export {
    isFileSystemAccessSupported,
    selectWallpaperFolder,
    restoreFolderPermission,
    loadWallpaperByIndex,
    nextWallpaper,
    previousWallpaper,
    getWallpaperCount,
    getCurrentWallpaperIndex,
    currentWallpaperUrl,
    wallpaperFiles,
}
