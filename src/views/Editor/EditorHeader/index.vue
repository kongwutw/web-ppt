<template>
  <div class="editor-header">
    <div class="left">
      <Dropdown :trigger="['click']">
        <div class="menu-item"><IconFolderClose /> <span class="text">文件</span></div>
        <template #overlay>
          <Menu>
            <MenuItem>
              <FileInput accept=".json" @change="files => handleChange(files)">
                导入
              </FileInput>
            </MenuItem>
            <MenuItem @click="exportJSON()">导出</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item"><IconEdit /> <span class="text">编辑</span></div>
        <template #overlay>
          <Menu>
            <MenuItem @click="undo()">撤销</MenuItem>
            <MenuItem @click="redo()">重做</MenuItem>
            <MenuItem @click="createSlide()">添加页面</MenuItem>
            <MenuItem @click="deleteSlide()">删除页面</MenuItem>
            <MenuItem @click="toggleGridLines()">{{ showGridLines ? '关闭网格线' : '打开网格线' }}</MenuItem>
            <MenuItem @click="resetSlides()">重置幻灯片</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item"><IconPpt /> <span class="text">演示</span></div>
        <template #overlay>
          <Menu>
            <MenuItem @click="enterScreeningFromStart()">从头开始</MenuItem>
            <MenuItem @click="enterScreening()">从当前页开始</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <div class="menu-item" @click="hotkeyDrawerVisible = true">
        <IconHelpcenter /> 
        <span class="text">快捷键</span>
      </div>
    </div>

    <div class="right">
      <Tooltip :mouseLeaveDelay="0" title="幻灯片放映">
        <div class="menu-item" @click="enterScreening()">
          <IconPpt size="18" fill="#666" style="margin-top: 2px;" />
        </div>
      </Tooltip>
    </div>

    <Drawer
      width="320"
      placement="right"
      :visible="hotkeyDrawerVisible"
      @close="hotkeyDrawerVisible = false"
    >
      <HotkeyDoc />
    </Drawer>

    <FullscreenSpin :loading="exporting" tip="正在导出..." />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { UploadProps } from 'ant-design-vue'

import { useMainStore, useSlidesStore } from '@/store'
import useScreening from '@/hooks/useScreening'
import useSlideHandler from '@/hooks/useSlideHandler'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'
import useExport from '@/hooks/useExport'

import HotkeyDoc from './HotkeyDoc.vue'

const fileList = ref<UploadProps['fileList']>([])

const mainStore = useMainStore()
const slidesStore = useSlidesStore()
const { showGridLines } = storeToRefs(mainStore)

const { enterScreening, enterScreeningFromStart } = useScreening()
const { createSlide, deleteSlide, resetSlides } = useSlideHandler()
const { redo, undo } = useHistorySnapshot()
const { exporting, exportJSON } = useExport()

const toggleGridLines = () => {
  mainStore.setGridLinesState(!showGridLines.value)
}

const handleChange = async (files: File[]) => {
  const json = await files[0].text()
  slidesStore.setSlides(JSON.parse(json))
}

const hotkeyDrawerVisible = ref(false)
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.left, .right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  transition: background-color $transitionDelay;
  cursor: pointer;

  .text {
    margin-left: 4px;
  }
}

.left .menu-item:hover {
  background-color: $lightGray;
}
</style>