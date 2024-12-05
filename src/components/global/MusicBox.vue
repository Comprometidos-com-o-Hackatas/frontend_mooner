<script setup>
import { ref } from 'vue'
import play from '../../assets/images/icons/play.svg'
import pause from '../../assets/images/icons/pause.svg'
import { useRouter } from 'vue-router';
import SettingsGlobal from './SettingsGlobal.vue'
import AddPlaylist from './AddPlaylist.vue'
import { adjusteSize, verify_active } from '@/utils/music/music'
import { useQueueStore, usePlayerStore, usePlaylistStore, useHistoryStore, useLoginStore, useSongStore, useArtistStore, useMoonStore } from '@/stores'
import AudioPlayer from './AudioPlayer.vue'

const songStore = useSongStore()
const HistoryStore = useHistoryStore()
const LoginStore = useLoginStore()
const playerStore = usePlayerStore();
const QueueStore = useQueueStore()
const playlistStore = usePlaylistStore()
const moonStore = useMoonStore()
const artistStore = useArtistStore()
const router = useRouter()

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
    is_search_history:{
        type: Boolean,
        required: false
    },
    buttons: {
        type: Boolean,
        default: false
    },
    is_history: {
        type: Boolean,
        default: false
    },
    showInPlaylistAddComponent: {
        type: Boolean,
        default: false
    }
})

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
  if (QueueStore.state.currentSong != props.music_data){
    QueueStore.setCurrentSong(props.music_data)
    playerStore.play()
    if (moonStore.state.reconnect) {
      moonStore.sendActions('song')
    }
  }
  else {
    if (moonStore.state.reconnect) moonStore.sendActions('use');
    else playerStore.usePlay();
  }
}

const verifyInPlaylist = (song) => {
  if (playlistStore.selectedPlaylist.songs.filter(s => s.id == song.id).length > 0) {
    return false
  } else {
    return true
  }
}

const to = (id, artist) => {
  artistStore.state.selectedArtist = {}
  localStorage.removeItem("artistStorage")
  artistStore.state.selectedArtist = artist
  
    router.push('/artistDetail/' + id)
 
  
}

</script>
<template>
    <div  v-if="props.showInPlaylistAddComponent ? verifyInPlaylist(props.music_data) : !showInPlaylistAddComponent " @click="props.buttons ? clickToAdd = !clickToAdd : ''" class="w-[275px] min-h-[45px] relative rounded-lg hover:bg-[rgba(27,27,27,0.6)] duration-100 lg:w-[300px] p-2">
        <div v-if="props.buttons && clickToAdd " class='absolute w-full h-full rounded-md bg-[#6340AE] opacity-[0.95] top-0 left-0 z-50 flex justify-center items-center duration-150'>
           <img class="size-8" src="@/assets/images/icons/verified.svg">
           <p>Adicionado</p>
        </div>
    <div class="w-80 relative" :class="is_search_history ? 'bg-neutral-800 rounded-md' : null" @click="createsong">
    <div class="flex items-center h-[50px] w-full relative gap-3 music-box z-20">
        <div class="w-1/12 flex justify-center" v-if="props.has_index">
          <p class="text-2xl font-semibold text-white text-center">
            {{ props.has_index ? props.index : '' }}
          </p>
        </div>
        <div class="flex w-full h-full">
          <div class="h-full w-[28%] duration-200 relative z-10 flex justify-center items-center music-box-img">
            <AudioPlayer />
            <img
              class="absolute w-6 h-6 z-20 brightness-200 music-play cursor-pointer"
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
          
          <div class="w-8/12 flex flex-col justify-center pl-3 overflow-hidden">
            <div class="flex gap-2">
              <p @click="to(artists.artistic_name, artists)"
                :class="is_search_history ? 'text-white' : 'text-base[10px] text-white  flex'"
                v-for="artists in music_data.artists"
                :key="artists.id" class="break-keep"
              >
                {{ artists.artistic_name }}
              </p>
            </div>
            <p :title="props.music_data.title" class="break-keep text-nowrap"
              :class="
                is_search_history
                  ? 'font-semibold text-base text-white'
                  : 'font-semibold text-[18px] text-white'
              "
            >
              {{ adjusteSize(props.music_data.title, 12, 12) }}
            </p>
           
          </div>
          <div
            class="w-2/12 flex justify-end items-center music-play"
            v-if="!is_search_history || props.buttons"
          >
            <img
              @click="songStore.activated({id: props.music_data.id, name: 'playlist'}), (settings = false), (verify_active = !verify_active)"
              src="../../assets/images/icons/add.svg"
              class="w-6 h-6"
            />
            <img
              @click="songStore.activated({id: props.music_data.id, name: 'settings'}), (playlist = false), (verify_active = !verify_active)"
              src="../../assets/images/icons/settingsdot.svg"
              class="w-4 h-4"
            />
          </div>
          <div
            class="w-3/12 flex justify-end items-center music-play"
            v-if="!is_search_history || props.buttons"
          >
            <!-- <h1 class="cursor-pointer text-xl text-neutral-700" @click="$emit('deletesong')">X</h1> -->
          </div>
        </div>
      </div>
    </div>
    <SettingsGlobal
      v-if="!is_search_history"
      :is_on="songStore.simpleState.item_settings == props.music_data.id"
      @addQueue="QueueStore.addSongToQueue(props.music_data), songStore.simpleState.item_settings = null"
    />
    <AddPlaylist
      v-if="!is_search_history"
      :is_on="songStore.simpleState.item_playlist == props.music_data.id"
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