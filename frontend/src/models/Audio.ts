export interface Audio {
  id: number
  blob: Blob | string
  duration: string
  summary: string
  audio: HTMLAudioElement
  isPlaying: boolean
}
