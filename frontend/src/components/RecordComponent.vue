<script setup lang="ts">
import { Play, File, Pause } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Audio } from '@/models/Audio'
import { Progress } from '@/components/ui/progress'
import type { PropType } from 'vue'
import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()

defineProps({
  audio: {
    type: Object as PropType<Audio>,
    required: true
  }
})
</script>

<template>
  <article>
    <Card>
      <CardHeader class="pb-4">
        <CardTitle>Grabación #00{{ audio.id }}</CardTitle>
        <CardDescription>{{ audio.duration }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4 items-center">
          <button v-if="!audio.isPlaying" @click.prevent="audioStore.play(audio)" variant="ghost">
            <Play class="size-5" />
          </button>
          <button v-else @click.prevent="audioStore.play(audio)" variant="ghost">
            <Pause class="size-5" />
          </button>
          <Progress :model-value="33" />
          <button @click.prevent="audioStore.visualizeSummary(audio)" variant="ghost">
            <File class="size-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  </article>
</template>
