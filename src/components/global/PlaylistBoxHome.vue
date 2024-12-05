<script setup>
import { useRouter } from 'vue-router';


import { usePlaylistStore } from '@/stores'
import { adjusteSize } from '@/utils/music/music';

const playlistStore = usePlaylistStore()

const router = useRouter()

const emits = defineEmits(['createPlaylist'])

const props = defineProps({
    playlist_data: {
        type: Object,
        required: true
    },
})

const to = (id, playlist) => {
  playlistStore.state.selectedPlaylist = {}
  localStorage.removeItem("playlistStorage")
  playlistStore.state.selectedPlaylist = playlist
  playlistStore.newPlaylist.name = playlistStore.selectedPlaylist.name
  playlistStore.newPlaylist.name = playlistStore.selectedPlaylist.name
  playlistStore.newPlaylist.id = playlistStore.selectedPlaylist.id
  playlistStore.newPlaylist.cover = playlistStore.attach ? playlistStore.attach : playlistStore.selectedPlaylist.cover?.attachment_key,
  router.push('/playlist/' + id)
}

</script>
<template>
    <div @click="to(playlist_data.id, playlist_data)" class="w-[200px] min-h-[45px] relative rounded-lg hover:bg-[rgba(32,32,32,0.6)] bg-[rgba(27,27,27,0.6)] duration-100 lg:w-[300px] gap-3 p-2 flex flex-col overflow-hidden">
        <div class="h-[170px] w-full duration-200 relative z-10 flex justify-center items-center music-box-img"><img class="rounded-lg w-full h-full z-20 brightness-100 cursor-pointer" :src="playlist_data.cover?.url"></div>
        <div class="w-full flex flex-col justify-center pl-3 ">
        <p v-for="item in playlist_data.owners" class="text-[12px] text-white flex">{{ item.email }}</p>
        <p class="font-semibold text-[18px] text-white">{{ adjusteSize( playlist_data.name, 16, 16 ) }}</p>
        </div>
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