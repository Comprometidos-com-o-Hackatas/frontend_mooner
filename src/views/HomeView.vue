<script setup>
import { computed, onMounted, ref } from 'vue';
import { useSongStore, useLoginStore, usePlaylistStore, useQueueStore, useNavigationStore, useArtistStore } from '@/stores/index'

const navigationStore = useNavigationStore()

import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';
import MusicBox from '@/components/global/MusicBox.vue';

import SideHeaderOptions from '@/components/newDesign/SideHeaderOptions.vue';

import { data_music_home } from '@/utils/music/music';

const songStore = useSongStore()
const loginStore = useLoginStore()
const playlistStore = usePlaylistStore()
const queueStore = useQueueStore()
const ArtistStore = useArtistStore()

const verifyHasPlaylist = computed(()=>{
  const playlists = playlistStore.playlistsByOwner.length
  return playlists > 0 ? true : false
})

onMounted(()=>{
  console.log(navigationStore)
})

onMounted(async ()=>{
  data_music_home.value[0].music = await songStore.getSongs(loginStore.access)
  data_music_home.value[1].music = await songStore.GetRecommendedSongs(loginStore.user.email)
  if(data_music_home.value[1].music.length === 0){
    data_music_home.value[1].music = await songStore.getSongs(loginStore.access)
  }
  data_music_home.value[2].music = await ArtistStore.getArtists(loginStore.access)
})

</script>
<template>
  <main :class="queueStore.state?.currentSong ? 'pb-[70px]' : ''" class=" w-full min-h-full flex justify-end gap-4 overflow-x-hidden">
    
    <section class="my-auto mr-2 min-h-full rounded-lg w-[98%] xl:w-[100%] 2xl:m-0 bg-[rgb(18,18,18)] overflow-auto">
      <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in navigationStore?.state?.data_page" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_page, item.title)" />
      </ContainerNavigateButtons>

      <ContainerNavigateButtons justify="justify-start" class="mt-2 px-5">
        <NavigateHomeButtons :has_active_bg="false" v-for="item,index in navigationStore.state.data_section" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_section, 'navigate')" />
      </ContainerNavigateButtons>

      <MusicGlobalContainer :justify_div="'justify-start'" class="mt-3" :title="item.title" v-for="item, index in data_music_home" :key="index">
        <MusicBox  v-for="music, index in item.music" :key="index" :music_data="music" :index="index" :has_playlist="verifyHasPlaylist" />
      </MusicGlobalContainer>
    </section>
    
  </main>
</template>
