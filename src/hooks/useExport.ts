import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { saveAs } from 'file-saver'
import { useSlidesStore } from '@/store'

export default () => {
  const { slides } = storeToRefs(useSlidesStore())
  const exporting = ref(false)
  
  // 导出JSON文件
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(slides.value)], { type: '' })
    saveAs(blob, 'xq_ppts.json')
  }

  return {
    exporting,
    exportJSON
  }
}