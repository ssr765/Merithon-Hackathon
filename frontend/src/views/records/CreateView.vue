<script setup lang="ts">
import { Play, Pause, Bird, Rabbit, Turtle, Circle, Square, Mic, Trash2, ListChecks, ALargeSmall, ScrollText } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()
</script>

<template>
  <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="relative hidden flex-col items-start gap-8 md:flex">
      <form class="grid w-full items-start gap-6">
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">Modo de resumen</legend>
          <div class="grid gap-3">
            <!-- <Label for="model">Modo de resumen</Label> -->
            <Select v-model="audioStore.summaryMode">
              <SelectTrigger id="model" class="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Modo de resumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resumen">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <ALargeSmall class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        <span class="font-medium text-foreground"> Resumen de la reunión </span>
                      </p>
                      <p class="text-xs" data-description>Respuesta formal y estructurada.</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="puntos">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <ListChecks class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        <span class="font-medium text-foreground"> Resumen por puntos </span>
                      </p>
                      <p class="text-xs" data-description>Pinceladas superficiales indicando los puntos importantes.</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="coloquial">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <ScrollText class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        <span class="font-medium text-foreground"> Resumen coloquial </span>
                      </p>
                      <p class="text-xs" data-description>Texto más extendido pero explicado de una forma menos técnica.</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <Badge variant="outline" class="absolute right-3 top-3">
        <span v-if="!audioStore.recording">Idle</span>
        <span v-else class="flex items-center justify-center gap-1 uppercase">
          <Circle class="size-3 fill-red-500" />
          <p>Recording</p>
        </span>
      </Badge>
      <div class="flex-1">
        <div id="output" class="p-8"></div>
      </div>
      <div class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <div class="flex items-center p-3">
          <Button v-if="!audioStore.recording" @click="audioStore.toggleRecording()" variant="ghost" size="icon">
            <Mic class="size-4" />
          </Button>
          <Button v-else @click="audioStore.toggleRecording()" variant="ghost" size="icon">
            <Square class="size-4" />
          </Button>

          <p>{{ audioStore.recordTime }}</p>

          <div v-if="audioStore.actualAudio" class="flex items-center gap-4 ml-8">
            <p>Grabación actual</p>
            <div>
              <Button v-if="!audioStore.actualAudio.isPlaying" @click="audioStore.reproduceActual()" variant="ghost" size="icon">
                <Play class="size-4" />
              </Button>
              <Button v-else @click="audioStore.pauseActual()" variant="ghost" size="icon">
                <Pause class="size-4" />
              </Button>
              <Button @click="audioStore.stopActual()" variant="ghost" size="icon">
                <Square class="size-4" />
              </Button>
              <Button @click="audioStore.discardActual()" class="text-red-500" variant="ghost" size="icon">
                <Trash2 class="size-4" />
              </Button>
            </div>
          </div>

          <Button type="submit" size="sm" class="ml-auto gap-1.5" @click="audioStore.saveRecording()"> Procesar grabación </Button>
        </div>
      </div>
    </div>
  </main>
</template>
