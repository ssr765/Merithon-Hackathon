import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useTimeFormatter } from '@/composables/timeFormatter'
import type { Audio } from '@/models/Audio'
import TypeIt from 'typeit'

export const useAudioStore = defineStore('audio', () => {
  const { format } = useTimeFormatter()

  const recording = ref(false)
  const recordSeconds = ref(0)
  const recordTime = computed(() => format(recordSeconds.value))
  const mediaRecorder = ref<MediaRecorder | null>(null)
  const haveRecordedAudio = computed(() => actualRecord.value !== null)
  const audios = ref<Audio[]>([])
  const player = ref<HTMLAudioElement | null>(null)
  const actualRecord = ref<Blob | null>(null)
  const actualAudio = ref<Audio | null>(null)
  const audioSummary = ref('')
  const summaryMode = ref<string>('resumen')

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
          actualRecord.value = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
          actualAudio.value = {
            id: audios.value.length + 1,
            blob: URL.createObjectURL(actualRecord.value),
            audio: new Audio(URL.createObjectURL(actualRecord.value)),
            duration: recordTime.value,
            isPlaying: false
          } as Audio
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

  const saveRecording = async () => {
    if (!actualRecord.value) return

    try {
      const fd = new FormData()
      fd.append('mode', summaryMode.value)
      fd.append('audio', actualRecord.value, 'audio.ogg')
      const response = await axios.post('http://localhost:3000/api/procesar', fd)
      console.log(response)
      const sum = response.data.summary
      console.log(sum)
      new TypeIt('#output', {
        strings: sum.split('\n'),
        speed: 50,
        waitUntilVisible: true
      }).go()
      actualAudio.value!.summary = sum
    } catch (error) {
      console.error(error)
    }

    audios.value.push(actualAudio.value as Audio)
    discardActual()
  }

  const reproduceActual = () => {
    if (!actualAudio.value) return
    actualAudio.value.isPlaying = true
    actualAudio.value.audio.play()
  }

  const pauseActual = () => {
    if (!actualAudio.value) return
    actualAudio.value.isPlaying = false
    actualAudio.value.audio.pause()
  }

  const stopActual = () => {
    if (!actualAudio.value) return
    actualAudio.value.isPlaying = false
    actualAudio.value.audio.pause()
    actualAudio.value.audio.currentTime = 0
  }

  const discardActual = () => {
    if (!actualAudio.value) return
    actualAudio.value.audio.pause()
    actualAudio.value = null
    actualRecord.value = null
    recordSeconds.value = 0
  }

  const visualizeSummary = (audio: Audio) => {
    console.log(audio)
    console.log(audio.summary)
    audioSummary.value = audio.summary
  }

  const play = (audio: Audio) => {
    if (!audio.isPlaying) {
      audio.audio.play()
      audio.isPlaying = true
    } else {
      audio.audio.pause()
      audio.isPlaying = false
    }
  }

  return {
    recording,
    recordTime,
    haveRecordedAudio,
    actualAudio,
    audios,
    player,
    toggleRecording,
    saveRecording,
    reproduceActual,
    pauseActual,
    stopActual,
    discardActual,
    audioSummary,
    visualizeSummary,
    play,
    summaryMode
  }
})
