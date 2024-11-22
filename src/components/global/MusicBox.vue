<script setup>
import { ref, onMounted } from 'vue'

import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import SettingsGlobal from './SettingsGlobal.vue'
import AddPlaylist from './AddPlaylist.vue'
import { adjusteSize, verify_active } from '@/utils/music/music'
import { artist } from '@/utils/artist/artist-profile'
import { useQueueStore, usePlayerStore } from '@/stores'
import { useHistoryStore, useLoginStore } from '@/stores'
import AudioPlayer from './AudioPlayer.vue'

const HistoryStore = useHistoryStore()
const LoginStore = useLoginStore()
const playerStore = usePlayerStore();
const QueueStore = useQueueStore()

const emits = defineEmits(['createPlaylist'])

const props = defineProps({
  music_data: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  has_playlist: {
    type: Boolean,
    required: true
  },
  has_index: {
    type: Boolean,
    default: false
  },
  is_search_history: {
    type: Boolean,
    required: false
  },
  buttons: {
    type: Boolean,
    default: true
  },
  is_history: {
    type: Boolean,
    default: false
  }
})

const settings = ref(false)
const playlist = ref(false)
const clickToAdd = ref(false)

async function createsong() {
  if (!props.is_history) {
    await HistoryStore.CreateSongHistory(
      LoginStore.user.email,
      LoginStore.access,
      props.music_data.id
    )
  }
}

function setSong() {
  QueueStore.setCurrentSong(props.music_data)
  playerStore.usePlay()
}

</script>
<template>
  <div
    @click="!buttons ? (clickToAdd = !clickToAdd) : ''"
    class="w-80 relative rounded-md"
    :class="(clickToAdd ? 'bg-[#6340AE]' : 'bg-none', !buttons ? 'p-1' : '')"
  >
    <div
      :class="
        !buttons
          ? clickToAdd
            ? 'absolute w-full h-full rounded-md bg-[#6340AE] opacity-[0.95] top-0 left-0 z-30 flex justify-center items-center'
            : ''
          : ''
      "
    >
      <img
        v-if="!buttons && clickToAdd"
        class="size-8 z-50"
        src="@/assets/images/icons/verified.svg"
      />
      <p v-if="!buttons && clickToAdd">Adicionado</p>
    </div>
    <div
      class="w-80 relative"
      :class="is_search_history ? 'bg-neutral-800 rounded-md' : null"
      @click="createsong"
    >
      <div class="flex items-center h-10 w-full relative gap-3 music-box z-20">
        <div class="w-1/12 flex justify-center" v-if="props.has_index">
          <p class="text-2xl font-semibold text-white text-center">
            {{ props.has_index ? props.index : '' }}
          </p>
        </div>
        <div class="flex w-full h-full">
          <div class="h-full w-4/12 duration-200 relative z-10 music-box-img">
            <AudioPlayer />
            <img
              class="absolute top-2 left-[25px] w-6 h-6 z-20 brightness-200 music-play cursor-pointer"
              @click="setSong"
              :src="
                QueueStore.state.currentSong == props.music_data && playerStore.state.is_playing
                  ? pause
                  : play
              "
            />
            <img
              class="h-full w-full rounded-l-md music-img"
              :src="
                music_data.cover.url
                  ? music_data.cover.url
                  : music_data.cover.file
                    ? music_data.cover.file
                    : null
              "
            />
          </div>
          <div class="w-11/12 flex flex-col justify-center pl-3 overflow-hidden">
            <p
              :class="
                is_search_history
                  ? 'font-semibold text-base text-white'
                  : 'font-semibold text-lg text-white'
              "
            >
              {{ adjusteSize(props.music_data.title, 14, 14) }}
            </p>
            <div class="flex gap-2">
              <p
                :class="is_search_history ? 'text-' : 'text-base[10px] text-white  flex'"
                v-for="artists in music_data.artists"
                :key="artists.id"
              >
                {{ artists.artistic_name }}
              </p>
            </div>
          </div>
          <div
            class="w-2/12 flex justify-end items-center music-play"
            v-if="!is_search_history || props.buttons"
          >
            <img
              @click="(playlist = !playlist), (settings = false), (verify_active = !verify_active)"
              src="../../assets/images/icons/add.svg"
              class="w-6 h-6"
            />
            <img
              @click="(settings = !settings), (playlist = false), (verify_active = !verify_active)"
              src="../../assets/images/icons/settingsdot.svg"
              class="w-4 h-4"
            />
          </div>
          <div
            class="w-2/12 flex justify-end items-center music-play"
            v-if="!is_search_history || props.buttons"
          >
            <h1 class="cursor-pointer text-xl text-neutral-700" @click="$emit('deletesong')">X</h1>
          </div>
        </div>
      </div>
    </div>
    <SettingsGlobal
      v-if="!is_search_history"
      :is_on="settings"
      @addQueue="QueueStore.addSongToQueue(props.music_data)"
    />
    <AddPlaylist
      v-if="!is_search_history"
      :is_on="playlist"
      @createPlaylist="emits('createPlaylist')"
      :has_playlist="props.has_playlist"
      :music_data="props.music_data"
    />
  </div>
</template>
<style scoped>
.music-play {
  visibility: hidden;
}
.music-box {
  & :hover .music-img {
    filter: brightness(50%);
  }

  & :hover .music-play {
    visibility: visible;
  }
}
</style>