<script setup>

import { computed, onMounted, ref } from 'vue';
import { useSongStore, useLoginStore, usePlaylistStore, useQueueStore, useNavigationStore } from '@/stores/index'
const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
const queueStore = useQueueStore()
const navigationStore = useNavigationStore()

import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';

import MusicBox from '@/components/global/MusicBox.vue';
import { data_music_home } from '@/utils/music/music';

const verifyHasPlaylist = computed(()=>{
  const playlists = playlistStore.playlistsByOwner.length
  return playlists > 0 ? true : false
})

onMounted(()=>{
  console.log(navigationStore)
})

onMounted(async ()=>{
  data_music_home.value.forEach(item => {
    item.music = []
  });
  
  if (songStore.songs.length == 0) {  
  await songStore.getSongs(loginStore.access)
  for (let i = 0; i < data_music_home.value.length; i++) {
    for (let a = 0; a < songStore.songs.length; a++) {
      data_music_home.value[i].music.push(songStore.songs[a]) 
    }
  }
} else {
  for (let i = 0; i < data_music_home.value.length; i++) {
    for (let a = 0; a < songStore.songs.length; a++) {
      data_music_home.value[i].music.push(songStore.songs[a]) 
    }
  }
}

})


</script>
<template>
  <main :class="queueStore.state?.currentSong ? 'pb-[70px]' : ''" class=" w-full min-h-full flex justify-end gap-4 overflow-x-hidden">
    
    <section class="my-auto mr-2 min-h-full rounded-lg w-[98%] xl:w-[100%] 2xl:m-0 bg-[rgb(18,18,18)] overflow-auto">
      <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in navigationStore?.state?.data_page" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_page, item.title)" />
      </ContainerNavigateButtons>

      <ContainerNavigateButtons justify="justify-start" class="mt-2 px-5">
        <NavigateHomeButtons :has_active_bg="false" v-for="item,index in navigationStore.state.data_section"  :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_section, 'navigate')" />
      </ContainerNavigateButtons>

      <MusicGlobalContainer class="mt-3" :title="item.title" v-for="(item, index) in data_music_home.filter(item => item.title != 'Artistas que Você Gosta')" :key="index">
        <MusicBox  v-for="music, index in item.music" :key="index" :music_data="music" :index="index" :has_playlist="verifyHasPlaylist" />
      </MusicGlobalContainer>
    </section>

  </main>
</template>
