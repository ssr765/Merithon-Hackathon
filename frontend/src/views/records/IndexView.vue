<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore'
import RecordComponent from '@/components/RecordComponent.vue'

const audioStore = useAudioStore()
</script>

<template>
  <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="relative hidden flex-col items-start gap-8 md:flex">
      <form class="grid w-full items-start gap-6">
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">Audios</legend>
          <RecordComponent v-for="audio in audioStore.audios" :key="audio.id" :audio="audio" />
        </fieldset>
      </form>
    </div>
    <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <div class="flex-1">
        <div class="p-8">
          {{ audioStore.audioSummary }}
        </div>
      </div>
    </div>
  </main>
</template>
