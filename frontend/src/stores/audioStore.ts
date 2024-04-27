import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useTimeFormatter } from '@/composables/timeFormatter'

export const useAudioStore = defineStore('audio', () => {
  const { format } = useTimeFormatter()

  const recording = ref(false)
  const recordSeconds = ref(0)
  const recordTime = computed(() => format(recordSeconds.value))

  let interval: any = null
  const toggleRecording = () => {
    recording.value = !recording.value

    if (recording.value) {
      recordSeconds.value = 0
      interval = setInterval(() => {
        recordSeconds.value++
      }, 1000)
    } else {
      clearInterval(interval)
    }
  }

  return {
    recording,
    recordTime,
    toggleRecording
  }
})
