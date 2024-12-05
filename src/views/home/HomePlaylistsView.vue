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
import PlaylistBoxHome from '@/components/global/PlaylistBoxHome.vue';
import { data_music_home } from '@/utils/music/music';
import PaginationManager from '@/components/global/PaginationManager.vue';

onMounted(()=>{
  console.log(playlistStore.playlists)
})

onMounted(async ()=>{
  data_music_home.value.forEach(item => {
  item.music = []
  playlistStore.getPlaylist(loginStore.access)
  });

})


</script>
<template>
  <main :class="queueStore.state?.currentSong ? 'pb-[70px]' : ''" class=" w-full min-h-full flex justify-end gap-4 overflow-x-hidden">
    
    <section class="my-auto mr-2 min-h-full rounded-lg w-[98%] xl:w-[100%] 2xl:m-0 bg-[rgb(18,18,18)] overflow-auto relative">
      <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in navigationStore?.state?.data_page" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_page, item.title)" />
      </ContainerNavigateButtons>

      <ContainerNavigateButtons justify="justify-start" class="mt-2 px-5">
        <NavigateHomeButtons :has_active_bg="false" v-for="item,index in navigationStore.state.data_section" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_section, 'navigate')" />
      </ContainerNavigateButtons>
        
      <MusicGlobalContainer class="mt-3" >
        <PlaylistBoxHome v-for="playlist in playlistStore.playlists" :playlist_data="playlist" />
    </MusicGlobalContainer>
    <div class="w-full flex justify-center mt-16">
    <PaginationManager @previous="playlistStore.getPlaylist(loginStore.access, navigationStore.simpleState.page)" @next="playlistStore.getPlaylist(loginStore.access, navigationStore.simpleState.page)" class="bottom-5" />
    </div>
    </section>
    
  </main>
</template>
