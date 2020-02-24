/*
 * @Author: your name
 * @Date: 2020-02-24 22:15:50
 * @LastEditTime: 2020-02-24 22:20:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-app\src\utils\window-size.js
 */
import { ref, onMounted, onUnmounted } from 'vue'
export default () => {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const update = e => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  onMounted(() => {
    window.addEventListener('resize', update)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })
  return { width, height }
}