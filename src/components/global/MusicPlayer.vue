<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import prev from '../../assets/images/icons/prev.svg'
import next from '../../assets/images/icons/next.svg'
import repeat from '@/assets/images/icons/repeat.vue'
import random from '@/assets/images/icons/random.vue'
import moonWave from '@/assets/images/icons/moonWave.vue'
import sound_down from '@/assets/images/icons/sound-down.svg'
import sound_up from '@/assets/images/icons/sound-up.svg'
import sound_mute from '@/assets/images/icons/sound-mute.svg'
import backward from '@/assets/images/icons/backward.svg'
import forward from '@/assets/images/icons/forward.svg'
import { useQueueStore, usePlayerStore, useMoonStore, useLoginStore } from '@/stores'
import AudioPlayer from './AudioPlayer.vue'
import QueueDisplay from './queue/QueueDisplay.vue'
import MoonWaveManagement from '@/components/moonWave/MoonWaveManagement.vue'

const QueueStore = new useQueueStore();
const playerStore = new usePlayerStore();
const moonStore = new useMoonStore();
const LoginStore = new useLoginStore();

const showVolume = ref(false);
const volume = ref(50);
const time = ref(0)
const showTime = ref(0)
const intervalId = ref(null)

const updateProgress = () => {
  if (playerStore.state.songPlayer) {
    time.value = playerStore.state.songPlayer.currentTime
    
    if (time.value == playerStore.state.songPlayer.duration) {
      QueueStore.nextSong()
     }
  }
}

function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds =  parseInt(sec).toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

onMounted(()=>{
  
  intervalId.value = setInterval(updateProgress, 0)
  
  
    setInterval(() => {
    showTime.value = playerStore.state.songPlayer.currentTime
  }, 0)
  
})

onUnmounted(()=>{
  clearInterval(intervalId)
})

const updateTime = () => {
  if (playerStore.state.songPlayer) {
    playerStore.state.songPlayer.currentTime = time.value
    if(moonStore.state.reconnect) {
      moonStore.sendActions('time')
    }
  }
}

const updateTime10s = (operation) => {
  if (playerStore.state.songPlayer) {
    if (operation == '-') playerStore.state.songPlayer.currentTime = time.value - 10;
    else playerStore.state.songPlayer.currentTime = time.value + 10;
    if(moonStore.state.reconnect) {
      moonStore.sendActions('time')
    }
  }
}

const useMoonWave = () => {
  if(moonStore.state.reconnect) {
    moonStore.disconnectMoonWave();
  }
  else {
    moonStore.connectMoonWave(LoginStore.user.email)
  }
}


function usePlay() {
  if(moonStore.state.reconnect) {
    moonStore.sendActions('use')
  }
  else{
    playerStore.usePlay(); 
  }
}

function useNext() {
  if(moonStore.state.reconnect) {
      moonStore.sendActions('next')
  }
  else{
    QueueStore.nextSong(); 
  }
}

function usePrevious() {
  if(moonStore.state.reconnect) {
      moonStore.sendActions('previous')
  }
  else{
    if (QueueStore.state.history.length > 0) {
      QueueStore.previousSong() 
    }
  }
}



</script>

<template>
 
  <div
    v-show="QueueStore.state?.currentSong"
    class="flex w-[98%] ml-[1%] mr-[1%] fixed bottom-0 h-[9%] gap-1 items-center bg-[#0e0e0e] z-[9999] rounded-xl p-4"
  >
  <QueueDisplay v-if="!moonStore.reconnect" />
  <MoonWaveManagement />
  <div class="relative rounded-lg h-12 w-16">
        <AudioPlayer />
        <img
          class="w-full h-full border-none rounded-xl"
          v-if="QueueStore?.state?.currentSong?.cover?.url"
          :src="QueueStore.state.currentSong.cover?.url"
          alt=""
        />
      
      </div>
      <div class="flex flex-col items-start ml-3">
        <p class="text-xs font-thin text-white" v-if="QueueStore?.state?.currentSong?.artists">
          {{ QueueStore?.state?.currentSong?.artists.map((artist) => artist?.artistic_name).join(',') }}
        </p>
        <span class="text-base text-white font-extralight">{{
          QueueStore?.state?.currentSong?.title
        }}</span>
        
      </div>
   
    <div class="flex flex-row relative items-center gap-2 ml-24">
      <img
        class="cursor-pointer w-6 h-6 z-30 brightness-200"
        :src="backward"
        @click="updateTime10s('-')"
        alt=""
      />
      <img
        :class="
          QueueStore?.state?.history.length == 0 ? 'brightness-50' : 'brightness-200 cursor-pointer'
        "
        @click="usePrevious()"
        class="w-6 h-6 z-30"
        :src="prev"
        alt=""
      />
      <div class=" rounded-full w-[40px] h-[40px] flex justify-center items-center bg-[#7422C1]">
        <img
          class="absolute z-40 w-[25px] h-[18px] brightness-200 cursor-pointer" :class="playerStore.state.is_playing ? '' : 'ml-1'"
          @click="usePlay()"
          :src="playerStore.state.is_playing ? pause : play"
        />
      </div>
      <img
        class="cursor-pointer w-6 h-6 z-30 brightness-200"
        :src="next"
        @click="useNext()"
        alt=""
      />
      <img
        class="cursor-pointer w-6 h-6 z-30 brightness-200"
        :src="forward"
        @click="updateTime10s('+')"
        alt=""
      />
      
    </div>
    <div v-if="playerStore.state.songPlayer" class="w-[560px] flex justify-center items-center h-full gap-4">
      <input
        class="custom-range w-[70%]"
        type="range"
        min="0"
        :max="playerStore.state.songPlayer.duration || 0"
        v-model="time"
        @input="updateTime"
        :style="{
  background: `linear-gradient(to right, #7422C1 ${(showTime / playerStore.state.songPlayer.duration) * 100}%, #333 ${(showTime / playerStore.state.songPlayer.duration) * 100}%)`
}"
      />
      <p>{{ formatTime(time) }}</p>
    </div>

    <div class="flex flex-row absolute right-8 gap-3 items-center">
      <moonWave :color="moonStore.state.reconnect ? '#FFD700' : '#ffffff'" @click="useMoonWave()" class="cursor-pointer" />
      <random
        @click="QueueStore.randomize"
        :color="QueueStore?.state?.saveOrder.length > 0 ? '#FFD700' : '#ffffff'"
        class="cursor-pointer p-0"
      />
      <div @click="QueueStore.repeatSong" class="cursor-pointer">
        <repeat
          :color="
            QueueStore?.state?.queue[0]
              ? QueueStore?.state?.currentSong?.id == QueueStore.state?.queue[0].id
                ? '#FFD700'
                : '#ffffff'
              : '#ffffff  '
          "
          
        />
      </div>
      <div class="flex flex-row relative justify-center items-center">
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
    </div>
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

 .volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  position: relative;
  bottom: 3px;
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


 .volume::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px; 
  border-radius: 5px;
  background: transparent; 
}

.volume::-moz-range-track {
  width: 100%;
  height: 8px;
  background: transparent;
  border-radius: 5px;
} 

.custom-range {
  -webkit-appearance: none; /* Remove estilos padrão */
  appearance: none;
  width: 100%; /* Largura total */
  height: 4px; /* Altura do track */
  background: linear-gradient(to right, #7422C1 50%, #333 50%); /* Gradiente inicial */
  border-radius: 2px; /* Bordas levemente arredondadas */
  outline: none; /* Remove a borda de foco */
  cursor: pointer;
  position: relative;
}

/* Estilo do trilho (track) */
.custom-range::-webkit-slider-runnable-track {
  height: 4px; /* Altura menor do track */
  background: transparent; /* O gradiente já está na custom-range */
}

.custom-range::-moz-range-track {
  height: 4px;
  background: transparent;
}

.custom-range::-ms-track {
  height: 4px;
  background: transparent;
  border-color: transparent;
}

/* Estilo do thumb (a bolinha) */
.custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px; /* Largura do thumb */
  height: 16px; /* Altura do thumb */
  background: #ffffff; /* Cor do thumb */
  border: 3px solid #7422C1; /* Borda roxa */
  border-radius: 50%; /* Deixa o thumb circular */
  position: relative;
  top: -6px; /* Alinha o thumb acima do track */
  cursor: pointer; /* Cursor ao passar por cima */
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3); /* Sombra sutil */
  z-index: 2; /* Garante que o thumb sobreponha o track */
}

.custom-range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 3px solid #7422C1;
  border-radius: 50%;
  position: relative;
  top: -6px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.custom-range::-ms-thumb {
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 3px solid #7422C1;
  border-radius: 50%;
  position: relative;
  top: -6px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.custom-range:focus {
  outline: none;
}


</style>