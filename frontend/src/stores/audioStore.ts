import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useTimeFormatter } from '@/composables/timeFormatter'
import type { Audio } from '@/models/Audio'

export const useAudioStore = defineStore('audio', () => {
  const { format } = useTimeFormatter()

  const recording = ref(false)
  const recordSeconds = ref(0)
  const recordTime = computed(() => format(recordSeconds.value))
  const mediaRecorder = ref<MediaRecorder | null>(null)
  const audioBlob = ref<Blob | null>(null)
  const haveRecordedAudio = computed(() => audioBlob.value !== null)
  const audios = ref<Audio[]>([{}, {}, {}])

  let interval: any = null
  const toggleRecording = () => {
    recording.value = !recording.value

    if (recording.value) startRecording()
    else stopRecording()

    if (recording.value) {
      recordSeconds.value = 0
      interval = setInterval(() => {
        recordSeconds.value++
      }, 1000)
    } else {
      clearInterval(interval)
    }
  }

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorder.value = new MediaRecorder(stream)
        mediaRecorder.value.start()

        const chunks: Blob[] = []
        mediaRecorder.value.ondataavailable = (e) => {
          chunks.push(e.data)
        }

        mediaRecorder.value.onstop = () => {
          audioBlob.value = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        }
      } catch (error) {
        console.error(`The following getUserMedia error occurred: ${error}`)
      }
    } else {
      console.error('getUserMedia not supported on your browser!')
    }
  }

  function stopRecording() {
    if (!mediaRecorder.value) return

    mediaRecorder.value.stop()

    console.log(mediaRecorder.value.state)
    console.log('recorder stopped')
  }

  const reproducir = () => {
    new Audio(URL.createObjectURL(audioBlob.value!)).play()
  }

  return {
    recording,
    recordTime,
    haveRecordedAudio,
    audios,
    toggleRecording,
    reproducir
  }
})
