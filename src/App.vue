<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore, usePlaylistStore, useLoginStore, useCommunityStore } from '@/stores';

const userStore = useUserStore()
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const communityStore = useCommunityStore()

// router.beforeEach((to, from, next) => {
//   if (to.path == '/login' ||)
// })

  onMounted(async()=>{
    await userStore.getUser(loginStore.access)
    await playlistStore.getPlaylistsByOwner(userStore.myuser.email, loginStore.access)
    await communityStore.getCommunitysByAutor(userStore.myuser.email, loginStore.access)

  })
</script>
<template>
<KeepAlive>
  <RouterView />
</KeepAlive>
</template>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
  }
</style>

