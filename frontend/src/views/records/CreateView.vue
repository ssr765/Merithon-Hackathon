<script setup lang="ts">
import { Play, Pause, Bird, Rabbit, Turtle, Circle } from 'lucide-vue-next'

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
          <legend class="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <div class="grid gap-3">
            <Label for="model">Model</Label>
            <Select>
              <SelectTrigger id="model" class="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genesis">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <Rabbit class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground"> Genesis </span>
                      </p>
                      <p class="text-xs" data-description>Our fastest model for general use cases.</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="explorer">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <Bird class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground"> Explorer </span>
                      </p>
                      <p class="text-xs" data-description>Performance and speed for efficiency.</p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="quantum">
                  <div class="flex items-start gap-3 text-muted-foreground">
                    <Turtle class="size-5" />
                    <div class="grid gap-0.5">
                      <p>
                        Neural
                        <span class="font-medium text-foreground"> Quantum </span>
                      </p>
                      <p class="text-xs" data-description>The most powerful model for complex computations.</p>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-3">
            <Label for="temperature">Temperature</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-3">
              <Label for="top-p">Top P</Label>
              <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div class="grid gap-3">
              <Label for="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div>
          </div>
        </fieldset>
        <fieldset class="grid gap-6 rounded-lg border p-4">
          <legend class="-ml-1 px-1 text-sm font-medium">Messages</legend>
          <div class="grid gap-3">
            <Label for="role">Role</Label>
            <Select default-value="system">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system"> System </SelectItem>
                <SelectItem value="user"> User </SelectItem>
                <SelectItem value="assistant"> Assistant </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-3">
            <Label for="content">Content</Label>
            <Textarea id="content" placeholder="You are a..." class="min-h-[9.5rem]" />
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
      <div class="flex-1" />
      <div class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <div class="flex items-center p-3">
          <Button v-if="!audioStore.recording" @click="audioStore.toggleRecording()" variant="ghost" size="icon">
            <Play class="size-4" />
          </Button>
          <Button v-else @click="audioStore.toggleRecording()" variant="ghost" size="icon">
            <Pause class="size-4" />
          </Button>

          <p>{{ audioStore.recordTime }}</p>

          <Button v-if="audioStore.haveRecordedAudio" @click="audioStore.reproducir()" variant="ghost" size="icon"> <Play class="size-4" /> (REPRODUCIR AUDIO) </Button>

          <Button type="submit" size="sm" class="ml-auto gap-1.5"> Procesar grabación </Button>
        </div>
      </div>
    </div>
  </main>
</template>
