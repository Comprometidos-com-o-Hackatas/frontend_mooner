<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore, usePlaylistStore, useLoginStore, useCommunityStore, useFollowingStore } from '@/stores';
import AudioPlayer from "@/components/global/AudioPlayer.vue";
import { dataHeader } from './utils/header/header';

const userStore = useUserStore()
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const communityStore = useCommunityStore()
const followingStore = useFollowingStore()

onMounted(async()=>{
    await userStore.getUser(loginStore.access)
    dataHeader.playlist.content = await playlistStore.getPlaylistsByOwner(userStore.myuser.email, loginStore.access)
    dataHeader.artist.content =  await followingStore.getFollowingByUser(userStore.myuser.email, loginStore.access)
    dataHeader.community.content = await communityStore.getCommunitysByAutor(userStore.myuser.email, loginStore.access)
    console.log(dataHeader)
  })
</script>
<template>
  <RouterView />
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }
</style>

