<script setup>
import { adjusteSize } from '@/utils/music/music'
import { useNavigationStore, usePlaylistStore, useUserStore } from '@/stores';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const navigationStore = useNavigationStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()

const props = defineProps({
  playlists: {
    type: Array
  }
})
const router = useRouter()


const emits = defineEmits([
  'create'
])

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
 
  <div v-for="item in props.playlists" class="w-[90%] flex items-center select-none cursor-pointer hover:brightness-[70%]"  @click="to(item.id, item)">
    <div class="max-w-[5rem] max-h-[4.5rem] w-[5rem] h-[4.5rem] rounded-xl" :class="item.cover.url == null ? 'bg-slate-300' : ''">
      <img v-if="item.cover?.url" class="w-full h-full rounded-xl" :src="item.cover.url" >
    </div>
    <div class="ml-2 flex flex-col gap-[0.5px] text-base">
      <p class="text-xl font-normal text-white">{{ adjusteSize(item.name, 16, 16) }}</p>
      <p class="text-md font-light text-white break-words">
        {{ item.owners.length == 0 ? '' : adjusteSize(item.owners[0].email, 16, 16)}}
      </p>
    </div>
  </div>

  <div class="w-[90%] flex items-center cursor-pointer select-none">
    <div class="hover:brightness-[70%] min-w-[5rem] h-[4.5rem] rounded-xl border-2 flex justify-center items-center active:scale-[.9] duration-100"><p class="text-4xl text-white selectnone" @click="emits('create')">+</p></div>
    <div class="ml-2 flex flex-col gap-[0.5px] text-base">
      <p class="text-xl font-normal text-white">Crie Sua Nova Playlist</p>
    </div>
  </div>
</template>