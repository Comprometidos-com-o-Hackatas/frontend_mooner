<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useSongStore, useLoginStore, usePlaylistStore, useQueueStore,} from '@/stores/index'
import MusicBox from '@/components/global/MusicBox.vue'

import ButtonGlobal from '@/components/global/ButtonGlobal.vue'
import ContentContainer from '@/components/PlaylistDisplay/ContentContainer.vue'
import InfoContainer from '@/components/PlaylistDisplay/InfoContainer.vue'
import { useRoute, useRouter } from 'vue-router'
import { addToPlaylist, captureEmit, saveData, updatePlaylists, playAndQueue } from '@/utils/playlist/playlist'
const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
const queueStore = useQueueStore()
const route = useRoute()
const id = route.params.id
const token = loginStore.access
const songs = ref([])


onUnmounted(() => {
  window.location.reload()
  window.location.replace('http://127.0.0.1:5173/')
})
onMounted(() => {
  console.log('rodou')
  songs.value = []
  
})
const edit = ref(false)
const play = ref(false)
const settings = ref(false)

const img = ref(null)
const saveimg = ref(null)

async function handleFileUpload(e) {
  const target = e.target
  if (target && target.files) {
    const file = target.files[0]
    img.value = URL.createObjectURL(file)
    saveimg.value = file
  }

}

const alreadyHas = ref(false)

const isOn = ref(false)

const close = () => {
  isOn.value = !isOn.value
}

const setAction = ref('')

const data_add_secondary = (music, setAction) => {
  return {
    song: music,
    action: setAction
  }
}
</script>
<template>
  <div v-if="isOn" class=" fixed left-0 z-[50] w-dvw h-dvh flex justify-center items-center">
    <div class="w-96 h-[500px] bg-[#121212] rounded-lg absolute z-[60] flex flex-col items-center">
      <span
        @click="close()"
        class="absolute right-3 cursor-pointer text-xl top-2 mdi mdi-close-circle text-red-500"
      ></span>
      <p class="h-[10%] text-xl text-white mt-3">Adicione Suas Músicas</p>

      <div class="max-h-[85%] h-[85%] w-11/12 bg-[#1a1a1a] overflow-auto ">
        <div class="w-full p-4 flex flex-col gap-3">
          <MusicBox v-if="setAction == 'add'"
            showInPlaylistAddComponent="true"
            @click="addToPlaylist(data_add_secondary(music, 'add'), songs, token )"
            buttons="true"
            is_search_history="false"
            v-for="(music, index) in songStore.songs"
            :key="index"
            :music_data="music"
            :index="index"
            :has_playlist="verifyHasPlaylist"
          />
        </div>
      </div>
      <ButtonGlobal
        class="mt-3 mb-3"
        @click="
          updatePlaylists(playlistStore.showNewPlaylist, token, null, songs, id),
            alreadyHas ? (alreadyHas = false) : alreadyHas, settings = !settings, isOn = !isOn, songs = []
        "
        title="Salvar Músicas"
        background="#6340AE"
        border_radius="10px"
        color="white"
      />
    </div>
    <div class="w-full h-full bg-black opacity-50"></div>
  </div>
  <main :class="queueStore.state?.currentSong ? 'h-[82dvh]' : 'min-h-dvh h-dvh'" class=" w-full xl:w-dvw lg:h-full flex justify-end gap-4">
    <section class="my-auto mr-2 xl:m-0 xl:w-full h-full flex rounded-l-lg w-[98%] bg-[#121212] lg:flex-col lg:justify-center">
    <InfoContainer @sendEmitData="captureEmit()" @updatePlaylist="updatePlaylists(playlistStore.newPlaylist, token, saveimg, saveData != undefined ? saveData.songs : [], id)" @playAndQueue="playAndQueue" @isEdit="edit = !edit" @isPlay="play = !play" :edit="edit" :play="play" :img="img" :saveimg="saveimg"/>
    <ContentContainer :setAction="setAction" @setAddOn="isOn = !isOn, setAction = 'add'" @setRemoveOn="setAction != 'remove' ? setAction = 'remove' : setAction = ''" :settings="settings" @setSettings="settings = !settings"  @sendEmitData="captureEmit" @removeFromPlaylist="addToPlaylist(saveData, songs, token)" @addToPlaylist="addToPlaylist(saveData, songs, token)" />
    </section>
  </main>
  <input class="hidden" type="file" id="photo" @change="handleFileUpload" />
</template>

<style scoped>
.edit-text {
  transition: 1s;
  position: absolute;
  right: 0;
}

.icon {
  transition: 0.3s;
  position: absolute;
  left: 0;
  z-index: 9999;
}
.edit {
  width: 20%;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 35px;
    font-size: 30px;
  }
}
</style>
