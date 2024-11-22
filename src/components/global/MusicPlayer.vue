<script setup>
import { ref, computed } from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import prev from '../../assets/images/icons/prev.svg'
import next from '../../assets/images/icons/next.svg'
import repeat from '@/assets/images/icons/repeat.vue'
import random from '@/assets/images/icons/random.vue'
import settings from '@/assets/images/icons/settingsdot.svg'
import sound_down from '@/assets/images/icons/sound-down.svg'
import { useQueueStore } from '@/stores'
import { data } from '@/utils/music/music'
import AudioPlayer from './AudioPlayer.vue'

const QueueStore = new useQueueStore()
const songPlayer = ref(null)
const showVolume = ref(false)
const volume = ref(50)

QueueStore.player = computed(() => songPlayer.value)

</script>

<template>
  <div
    v-show="QueueStore.state?.currentSong"
    class="flex w-[98%] ml-[1%] mr-[1%] fixed bottom-0 h-[9%] justify-between items-center bg-[#3B2174] z-20 rounded-xl p-4"
  >
    <div class="volume absolute left-35 z-50 bg-black w-1">
      <input type="range" class="volume" min="0" max="100" v-show="showVolume" v-model="volume" />
    </div>
    <div class="flex flex-row relative justify-center items-center gap-2">
      <img
        class="w-6 h-6 z-30 cursor-pointer brightness-200"
        @click="showVolume = !showVolume"
        :src="sound_down"
        alt=""
      />
      <img
        :src="!data[3].liked ? data[3].img[0] : data[3].img[1]"
        @click="data[3].liked = !data[3].liked"
        class="w-6 h-6"
      />
    </div>
    <div class="flex flex-row relative items-center gap-2">
      <img
        :class="
          QueueStore.state.history.length == 0 ? 'brightness-50' : 'brightness-200 cursor-pointer'
        "
        @click="QueueStore.state.history.length > 0 ? QueueStore.previousSong() : null"
        class="w-6 h-6 z-30"
        :src="prev"
        alt=""
      />
      <div class="relative rounded-lg bg-slate-600 h-12 w-12">
        <AudioPlayer />
        <img
          class="w-full h-full brightness-50 border-none rounded-xl"
          v-if="QueueStore?.state?.currentSong?.cover?.url"
          :src="QueueStore.state.currentSong.cover?.url"
          alt=""
        />
        <img
          class="absolute top-3 left-3.5 w-6 h-6 z-30 brightness-200 cursor-pointer"
          @click="usePlay"
          :src="QueueStore.is_playing ? pause : play"
        />
      </div>
      <img
        class="cursor-pointer w-6 h-6 z-30 brightness-200"
        :src="next"
        @click="QueueStore.nextSong()"
        alt=""
      />
      <div class="flex flex-col items-start">
        <span class="text-base text-white font-extralight">{{
          QueueStore?.state?.currentSong?.title
        }}</span>
        <p class="text-xs font-thin text-white">
          {{ QueueStore?.state?.currentSong?.artists.map((artist) => artist.artistic_name).join(',') }}
        </p>
      </div>
    </div>
    <div class="flex flex-row relative items-center">
      <random
        @click="QueueStore.randomize"
        :color="QueueStore?.state?.saveOrder.length > 0 ? '#FFD700' : '#ffffff'"
        class="cursor-pointer"
      />
      <div @click="QueueStore.repeatSong" class="cursor-pointer">
        <repeat
          :color="
            QueueStore?.state?.queue[0]
              ? QueueStore?.state.currentSong.id == QueueStore.state?.queue[0].id
                ? '#FFD700'
                : '#ffffff'
              : '#ffffff  '
          "
        />
      </div>
      <img class="cursor-pointer w-5 h-5 z-30 brightness-200" :src="settings" alt="" />
    </div>
  </div>
</template>

<style scoped>
.volume {
  transform: rotate(-90deg);
}
</style>
