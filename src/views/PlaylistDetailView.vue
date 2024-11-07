<script setup>

import { computed, onMounted, ref } from 'vue';
import router from '@/router';
import { useSongStore, useLoginStore, usePlaylistStore } from '@/stores/index'
const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';
import { data_section, data_page, data_music_home, selectSection} from '@/utils/music/music';

const access = ref(loginStore.access)

const verifyHasPlaylist = computed(()=>{
  const playlists = playlistStore.playlistsByOwner.length
  return playlists > 0 ? true : false
})

onMounted(async ()=>{
  await songStore.getSongs(loginStore.access)
  for (let i = 0; i < data_music_home.value.length; i++) {
    for (let a = 0; a < songStore.songs.length; a++) {
      data_music_home.value[i].music.push(songStore.songs[a]) 
    }
  }
  


})


</script>
<template>
  <main class=" w-full min-h-full flex justify-end gap-4">
    
    <section class="my-auto mr-2 min-h-full rounded-lg w-[98%] bg-[#121212]">
      <div class="min-w-full min-h-screen flex relative rounded-lg">

        <div class="absolute top-5 left-8 z-30 flex gap-3 items-center">
        <h2 class="text-white text-xl"> Playlist</h2>
        <i class="mdi mdi-eye text-white text-lg"></i>
        </div>
        <div class="w-1/6 h-1/6 absolute z-30">
            <img class="w-full h-full relative" src="@/assets/images/imagemdefundologin.png" alt="">
        </div>
        <div class="w-4/12 h-screen relative">
            <img class="w-full h-full relative" src="@/assets/images/imagemdefundologin.png" alt="">
            <div class="bg-black w-full h-full absolute top-0 opacity-70"></div>
        </div>
        <div class="w-8/12 bg-red-800 h-screen"></div>
      </div>
    </section>
  </main>
</template>
