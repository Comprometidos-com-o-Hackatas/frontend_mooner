<script setup>

import { computed, onMounted, ref } from 'vue';
import { useSongStore, useLoginStore, usePlaylistStore, useQueueStore, useNavigationStore, useArtistStore, useUserStore } from '@/stores/index'
const songStore = useSongStore()
const loginStore = useLoginStore()
const queueStore = useQueueStore()
const artistStore = useArtistStore()
const navigationStore = useNavigationStore()
const userStore = useUserStore()

import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import MusicGlobalContainer from '@/components/global/MusicGlobalContainer.vue';

import ArtistBoxHome from '@/components/global/ArtistBoxHome.vue';



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

      <MusicGlobalContainer :justify_div="'justify-center'" class="mt-3" >
        <ArtistBoxHome v-for="artist in artistStore.artists" :artist_data="artist" />
      </MusicGlobalContainer>
    </section>

  </main>
</template>
