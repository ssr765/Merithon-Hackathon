<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from './ui/button'
import { Audio } from '@/models/Audio'
import { Progress } from '@/components/ui/progress'
import type { PropType } from 'vue'

defineProps({
  audio: {
    type: Object as PropType<Audio>,
    required: true
  }
})
</script>

<template>
  <Card>
    <CardHeader class="pb-4">
      <CardTitle>Grabación #00{{ audio.id }}</CardTitle>
      <CardDescription>{{ audio.duration }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex gap-4 items-center">
        <button variant="ghost">
          <Play class="size-5" />
        </button>
        <Progress :model-value="33" />
      </div>
    </CardContent>
  </Card>
</template>
