<script setup>
import { headerInfo } from '@/utils/header/header'
import SideHeaderOptions from './SideHeaderOptions.vue';
import router from '@/router';
import { usePlaylistStore, useLoginStore, useUserStore, useCommunityStore, useQueueStore} from '@/stores';
import { shallowRef, reactive, onMounted } from 'vue';

const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const CommunityStore = useCommunityStore()
const queueStore = useQueueStore()
const userStore = useUserStore()
const token = loginStore.access
const user = userStore.myuser


const props = defineProps({
 data: {
    type: Object
 }
})

const playlistBody = reactive({
  name: `Playlist de ${user.email}`,
  owners: [user.email],
  songs: [],
  cover: 'e44619db-4f03-4971-851f-a0e634af22a1'
})

const createPlaylist = async (playlist, token) => {
  await playlistStore.createPlaylist(playlist, token)
  window.location.reload()
}

const showData = (data) => {
    if (data == 'playlist') {
        return props.data.playlist.content 
    } else if (data == 'artist') {
        return props.data.artist.content
    } else {
        return props.data.community.content
    }

}

const setDropDown = (index) => {
    headerInfo.value.forEach(element => {
        if (headerInfo.value[index] != element) {
        element.active = false
    }
    });
    headerInfo.value[index].active = !headerInfo.value[index].active
}

const responsive = shallowRef(window.screen.width)

const isOpen = shallowRef(false)
</script>
<template>
    <section class=" overflow-auto duration-500 mt-3 ml-3 rounded-lg flex flex-col items-center bg-[#121212] fixed z-[999]" :class="responsive < 1500 ? isOpen ? 'w-[300px]' :  'w-[80px]' : 'w-[300px]', queueStore.state?.currentSong ? 'h-[88dvh]' : 'h-[97dvh]'">
        <span v-if="responsive < 1500" @click="isOpen = !isOpen" :class="'duration-500 absolute bottom-10 bg-[#1f1f1f] px-4 py-2 text-white rounded-full'"><i class=" text-2xl" :class="!isOpen ? 'mdi mdi-arrow-right-thick' : 'mdi mdi-arrow-left-thick'"></i></span>
        <RouterLink to="/" class="w-full flex justify-center h-12 items-center gap-3 mt-4">
            <div class="h-full w-12" >
                <img class="w-full h-[90%]" src="@/assets/images/logoMooner.png" alt="">
            </div>
            <p :class=" responsive < 1500 ? isOpen ? 'text-3xl font-light duration-500 opacity-100' : 'duration-500 opacity-0 hidden' : 'duration-500 text-3xl font-light opacity-100'" class="text-white">Mooner</p>
        </RouterLink>

        <div class="w-full flex flex-col">
            <ul :class="responsive < 1500 ? 'duration-500 w-full list-none flex flex-col gap-3 items-center mt-10' : 'duration-500 w-full list-none flex flex-col gap-3 justify-center items-center mt-10'">
                <li class="cursor-pointer" :class="responsive < 1500 ? 'w-[100%] flex flex-col justify-center  text-white duration-500 py-1 px-5' : 'w-[90%] items-center flex flex-col justify-center  text-white duration-500 p-1'" v-for="item, index in headerInfo">
                    <span @click="setDropDown(index), router.push(item.to)" :class="responsive < 1500 ? isOpen ? 'w-full flex h-10 gap-3 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6' : 'w-full justify-center flex h-10 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6' : 'w-full flex h-10 gap-3 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6'" >
                        <span class="ml-4 2xl:ml-0 text-[35px]" v-if="item.icon.startsWith('mdi')" :class="item.icon"></span>
                        <img v-else class="ml-4 2xl:ml-0 h-[40px] w-[35px]" :src="item.icon" alt="">
                        <p :class="responsive < 1500 ? isOpen ? 'text-[16px] font-medium' : 'hidden' :'text-[16px] font-medium'">{{ item.title }}</p>
                        <span v-if="item.isList && !item.active" :class="responsive < 1500 ? isOpen ? '' : 'hidden' : '' " class="mdi mdi-chevron-down absolute right-1 text-[20px]"></span>
                        <span v-if="item.isList && item.active" :class="responsive < 1500 ? isOpen ? '' : 'hidden' : '' " class="mdi mdi-chevron-up absolute right-1 text-[20px] "></span>
                    </span>
                    <div :class="item.active ? 'animation' : 'normal'" v-if="item.isList && item.active && responsive < 1500 ? isOpen ? item.active : false : item.active">
                        <div v-if="item.title == 'Playlists'" @click="createPlaylist(playlistBody, token)" class="flex items-center gap-4 p-2 mt-2 w-full justify-center cursor-pointer hover:bg-[#1C1C1C] rounded-lg"><span :class="responsive < 1500 ? isOpen ? '' : 'hidden' : '' " v-if="item.isList && item.add " class="mdi mdi-plus-circle text-white text-lg"></span>
                        <p v-if="item.isList && item.add ">Create Playlist</p></div>
                        <div v-if="item.title == 'Communitys'" @click="router.push('/createcommunity/')" class="flex items-center gap-4 p-2 mt-2 w-full justify-center cursor-pointer hover:bg-[#1C1C1C] rounded-lg"><span :class="responsive < 1500 ? isOpen ? '' : 'hidden' : '' " v-if="item.isList && item.add " class="mdi mdi-plus-circle text-white text-lg"></span>
                            <p v-if="item.isList && item.add ">Create Community</p></div>
                            <SideHeaderOptions :data="showData(item.name)" :type="item.name"/>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scooped>
.normal {
    opacity: 0;
    transition: 2s;
}
.animation {
    animation-name: setDown;
    animation-duration: 300ms;
    animation-iteration-count: 1;
    opacity: 1;
} 

::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: transparent; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

@keyframes setDown {
    0% {
       opacity: 0;
    }
    100% {
       opacity: 1;
    }
}

</style>
