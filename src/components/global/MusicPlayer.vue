<script setup>
import { ref } from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import prev from '../../assets/images/icons/prev.svg'
import next from '../../assets/images/icons/next.svg'
import repeat from '@/assets/images/icons/repeat.vue'
import random from '@/assets/images/icons/random.vue'
import settings from '@/assets/images/icons/settingsdot.svg'
import sound_down from '@/assets/images/icons/sound-down.svg'
import sound_up from '@/assets/images/icons/sound-up.svg'
import sound_mute from '@/assets/images/icons/sound-mute.svg'
import { useQueueStore, usePlayerStore } from '@/stores'
import { data } from '@/utils/music/music'
import AudioPlayer from './AudioPlayer.vue'

const QueueStore = new useQueueStore()
const playerStore = new usePlayerStore()
const showVolume = ref(false)
const volume = ref(50)

</script>

<template>
  <div
    v-show="QueueStore.state?.currentSong"
    class="flex w-[98%] ml-[1%] mr-[1%] fixed bottom-0 h-[9%] justify-between items-center bg-[#3B2174] z-20 rounded-xl p-4"
  >
    <div class="flex flex-row relative justify-center items-center gap-2">
      <img
        class="w-6 h-6 z-30 cursor-pointer brightness-200"
        @click="showVolume = !showVolume"
        :src="(volume == 0) ? sound_mute : (volume < 50) ? sound_down : sound_up"
        alt=""
      />
      <div class="relative left-35 z-50">
      <input 
      type="range" 
      class="volume" 
      :class="showVolume ? 'volume-open volume' : 'volume-close volume-hidden volume'"
      min="0" max="100" 
      v-model="volume"
      @input="playerStore.state.songPlayer.volume = volume/100"
      :style="{
        background: `linear-gradient(to right, #8c5fec ${volume}%, #ddd ${volume}%)`
        }"/>
    </div>
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
          @click="playerStore.usePlay()"
          :src="playerStore.state.is_playing ? pause : play"
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
        <p class="text-xs font-thin text-white" v-if="QueueStore?.state?.currentSong?.artists">
          {{ QueueStore?.state?.currentSong?.artists.map((artist) => artist?.artistic_name).join(',') }}
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

@keyframes volume-open-animation{
  0% {
    opacity: 0;
    width: 0px
  }
  100% {
    width: 100px;
    opacity: 1;
  }
}

@keyframes volume-close-animation{
  0% {
    width: 100px;
  }
  100% {
    width: 0px;
    opacity: 0;
  }
}

.volume-open {
  animation: volume-open-animation 0.4s ease 1;
}

.volume-close {
  animation: volume-close-animation 0.4s ease 1;
}

.volume-hidden {
  width: 0px;
  opacity: 0;
}
/* Estilo básico do slider (já existente) */
.volume {
  -webkit-appearance: none;
  appearance: none;
  max-width: 100px;
  height: 8px;
  background: linear-gradient(to right, #8c5fec 0%, #8c5fec 50%, #ddd 50%, #ddd 100%);
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
}

/* Thumb personalizado */
.volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 2px solid #8c5fec;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.volume::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 2px solid #8c5fec;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

/* Trilho (track) */
.volume::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px; /* Altura da trilha */
  border-radius: 5px;
  background: transparent; /* A trilha é definida pelo elemento principal */
}

.volume::-moz-range-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border-radius: 5px;
}

</style>
