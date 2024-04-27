<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
let mediaRecorder

let audios = ref([])
function escuchar() {
  InicializarRecording()
  console.log('recorder started')
}
function playAudio(audio) {
  console.log(audio)
  audio.audioObject.play()
}
function reiniciarAudio(audio) {
  console.log('reiniciar')
  audio.audioObject.currentTime = 0
  audio.audioObject.pause()
}
function pauseAudio(audio) {
  console.log('pause')
  audio.audioObject.pause()
}

function procesarAudio(blob) {
  console.log('enviar')
  const formData = new FormData()
  formData.append('audio-file', blob)
  fetch('http://localhost:3000/api/procesar', {
    method: 'POST',
    body: formData
  }).then((response) => {
    console.log(response)
  })
}

function InicializarRecording() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.')
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        }
      )

      // Success callback
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.start()
        let chunks = []

        mediaRecorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' })
          let audioObject = new Audio(URL.createObjectURL(blob))
          let blobDict = {
            audio: blob,
            audioObject: audioObject
          }
          audios.value.push(blobDict)
          console.log(audios)
          //   const audioURL = window.URL.createObjectURL(blob)
        }

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data)
        }
      })

      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`)
      })
  } else {
    console.log('getUserMedia not supported on your browser!')
  }
}

function pararRecording() {
  mediaRecorder.stop()

  console.log(mediaRecorder.state)
  console.log('recorder stopped')
}
</script>

<template>
  <div v-for="audio in audios">
    <p>Audio X</p>
    <Button @click="playAudio(audio)">Play</Button>
    <Button @click="pauseAudio(audio)">Pausar</Button>
    <Button @click="reiniciarAudio(audio)">Reiniciar </Button>
  </div>
  <Button @click="escuchar">Escuhar</Button>
  <Button @click="pararRecording">Parar </Button>
</template>
