<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore, usePlaylistStore, useLoginStore, useCommunityStore, useFollowingStore } from '@/stores';
import { dataHeader } from './utils/header/header';
import { AudioPlayer, player } from './components';

const userStore = useUserStore()
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const communityStore = useCommunityStore()
const followingStore = useFollowingStore()


onMounted(async()=>{
    await userStore.getUser(loginStore.access)
    await playlistStore.getPlaylistsByOwner(userStore.myuser.email, loginStore.access)
    await communityStore.getCommunitysByAutor(userStore.myuser.email, loginStore.access)
    await followingStore.getFollowingByUser(userStore.myuser.email, loginStore.access)
    dataHeader.playlist.content = playlistStore.playlistsByOwner
    dataHeader.artist.content = followingStore.followersByUser
    dataHeader.community.content = communityStore.communitys
    console.log(dataHeader.artist.content)

    
    
  })
</script>
<template>
  <AudioPlayer />
  <player />
  <RouterView />
</template>
<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }
</style>

