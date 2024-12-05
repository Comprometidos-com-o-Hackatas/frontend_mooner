<script setup>
import { useRouter } from 'vue-router';


import { useArtistStore } from '@/stores'
import { adjusteSize } from '@/utils/music/music';

const artistStore = useArtistStore()

const router = useRouter()

const emits = defineEmits(['createPlaylist'])

const props = defineProps({
    artist_data: {
        type: Object,
        required: true
    },
})

const to = (id, artist) => {
  artistStore.state.selectedArtist = {}
  localStorage.removeItem("artistStorage")
  artistStore.state.selectedArtist = artist
  
    router.push('/artistDetail/' + id)
 
  
}

</script>
<template>
    <div @click="to(props.artist_data.artistic_name, props.artist_data)" class="w-[190px] min-h-[45px] relative rounded-lg hover:bg-[rgba(32,32,32,0.6)] duration-100 lg:w-[300px] gap-3 p-2 flex flex-col items-center overflow-hidden">
        <div class="h-[100px] w-[100px] duration-200 relative z-10 flex justify-center items-center music-box-img"><img class="rounded-full w-full h-full z-20 brightness-100 cursor-pointer" :src="props.artist_data.user?.perfil?.url"></div>
        <div class="w-full flex flex-col items-center justify-center pl-3 ">
        <p class="text-[13px] text-white flex">{{ adjusteSize(artist_data.artistic_name, 21, 21) }}</p>
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