<script lang="ts" setup>
import { Button } from '@/components/ui/button'

let mediaRecorder

let audios = []

function escuchar() {
  InicializarRecording()
  console.log('recorder started')
}

function enviarAudio(blob) {
  const formData = new FormData()
  formData.append('audio-file', blob)
  fetch('http://localhost:3000/procesar', {
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
          enviarAudio(blob)
          //   new Audio(URL.createObjectURL(blob)).play()
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
  <h1>Test</h1>
  <Button @click="escuchar">Escuhar</Button>
  <Button @click="pararRecording">Parar</Button>
</template>
