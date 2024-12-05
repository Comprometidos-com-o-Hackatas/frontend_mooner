<script setup>
import {ref, onMounted } from 'vue'
import { useAlbumStore, useArtistStore, useLoginStore, useSongStore, useCommunityStore } from '@/stores'
import MusicBox from '../global/MusicBox.vue';
import MusicGlobalContainer from '../global/MusicGlobalContainer.vue';
import AlbunsArtistContainer from './AlbunsArtistContainer.vue';
import ArtistCommunity from './ArtistCommunity.vue';

const emits = defineEmits(['addToPlaylist', 'setSettings', 'setAddOn', 'setRemoveOn', 'sendEmitData', 'removeFromPlaylist'])

const props = defineProps({
  settings: {
    type: Boolean,
    default: false
  },
  addCompOn: {
    type: Boolean,
    default: false
  },
  removeOn: {
    type: Boolean,
    default: false
  },
  setAction: {
    type: String,
  },
  artist: {
    type: Object,
    default: null
  }
})


const songs = ref([])
const albumStore = useAlbumStore()
const artistStore = useArtistStore()
const loginStore = useLoginStore()
const songStore = useSongStore()
const communityStore = useCommunityStore()
const token = loginStore.access
onMounted(async() => {
  songs.value = []
  await  albumStore.getAlbunsByAutor(artistStore.selectedArtist.user, token)
  await songStore.getSongsByArtist(artistStore.selectedArtist.artistic_name, token)
  console.log(albumStore.albunsByAutor)
  await communityStore.getCommunitysByAutor(artistStore.selectedArtist.user, token)
  await communityStore.getCommunitysPostsByCommunity(communityStore.communitysByAutor[0].id, token)

  
})

</script>
<template>
     <div class="w-8/12 h-full flex items-center lg:flex-col lg:w-full lg:mt-12 pb-20 overflow-auto relative">
        <div class="w-[66%] h-full flex flex-col items-center lg:w-full lg:mt-0 pb-20">
        <div class="w-full flex justify-start items-center pt-8 pl-6">
        <h1 class="text-white text-4xl font-semibold">Discografia</h1>
        </div>
        <div class="w-full flex justify-start items-center pt-6 pl-6">
        <p class="text-white text-xl">Músicas</p>
        </div>
        <MusicGlobalContainer class="w-full">
          <MusicBox
            class="max-h-[60px]"
            v-if="songStore.songsByArtist?.length > 0"
            v-for="(music, index) in songStore.songsByArtist"
            :key="index"
            :music_data="music"
            :index="index"
          />
        </MusicGlobalContainer>

        <ArtistCommunity :data_posts="communityStore.communitysPostsByCommunity" :data="communityStore.communitysByAutor[0]" />
    </div>
    <div class="h-[90%] lg:h-full w-[260px] top-5 right-3 flex flex-col mr-1 fixed lg:relative lg:w-[95%] lg:right-0">
        <AlbunsArtistContainer v-if="artistStore.selectedArtist.user == albumStore.albunsByAutor[0]?.autor.user":data="albumStore.albunsByAutor" class="mr-5" />
    </div>
      </div>
      
</template>

<style scoped>
.edit-text {
  transition: 1s;
  position: absolute;
  right: 0;
}

.icon {
  transition: 0.3s;
  position: absolute;
  left: 0;
  z-index: 9999;
}
.edit {
  width: 20%;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 35px;
    font-size: 30px;
  }
}
</style>
