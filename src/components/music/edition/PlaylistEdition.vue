<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { AddPlaylistSongs, ButtonGlobal  } from '@/components';
import { useSongStore, useImgStore, useLoginStore, usePlaylistStore, useUserStore } from '@/stores';
import { transformToId } from '@/utils/playlist/playlist';
import router from '@/router';
const playlistStore = usePlaylistStore()
const loginStore = useLoginStore()
const imgStore = useImgStore();
const userStore = useUserStore()
const songStore = useSongStore()
const token = loginStore.access
const props = defineProps({
    data: {
        type: Object
    }
})

const img = ref(null)
const saveimg = ref(null)

const emits = defineEmits([
    'addPlaylist',
    'save'
])

async function handleFileUpload(e) {
  const target = e.target
  if (target && target.files) {
    const file = target.files[0]
    img.value = URL.createObjectURL(file)
    saveimg.value = file
  }

}

const name = ref(props.data.name)

  const addToPlaylist = (song) => {
    playlistStore.selectedPlaylist.songs.push(song)
    
    transformToId()
   
  }

  const update = async () => {
    
    // emits('save', newPlaylist)
    if (img.value != null && saveimg.value !=null ) {
      await imgStore.CreateNewImg(saveimg.value, token).then((response) => {
        playlistStore.attach = response
      })
      await imgStore.GetImagesByAttachment_key(playlistStore.attach, token)
      playlistStore.newPlaylist.cover = imgStore.selectedImage.attachment_key
    } else {
      playlistStore.newPlaylist.cover = playlistStore.selectedPlaylist.cover.attachment_key
    }
    playlistStore.newPlaylist.owners.push(userStore.myuser.email)
    playlistStore.newPlaylist.name = name.value
    playlistStore.updatePlaylist(playlistStore.newPlaylist, token)
    console.log(playlistStore.newPlaylist)


    router.push('/')
  }

  onUnmounted(()=>{
    window.location.reload()
  })

 
</script>
<template>
    <section class="fixed bg-gradient-to-t from-black backdrop-blur-sm w-full min-h-screen h-auto flex flex-col z-[99999] gap-10">
        <ButtonGlobal @click="update()" :title="'Salvar'" border="1px solid white" width="150px" border_radius="20px" color="white"
        padding="5px" class="me-32 absolute right-0  top-20" />
        <div class="w-9/12 bg-[#151515] rounded-2xl mt-16 ml-5 text-xl text-white font-medium">
            <input  type="text" v-model="name"  class="w-full bg-transparent outline-none py-6 px-4">
        </div>
        
        <div class="w-full flex">
        <div class="w-7/12">
        <div class="ml-5 w-full gap-4 flex flex-col relative">
            <label
              for="photo"
              
              class="lg:rounded-3xl w-full h-[430px] hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.6)] duration-150 absolute z-40 flex justify-center items-center cursor-pointer"
            >
              <i class="mdi mdi-image-edit sm:text-5xl text-white text-8xl"></i>
            </label>
            <img v-if="props.data.cover || img"
              :src="
                img == null
                  ? props.data.cover ? props.data.cover.url
                    : img
                  : img
              "  class=" rounded-3xl h-[430px] object-cover" alt="">
            <div class="w-full flex justify-between">
            <div class="flex gap-3 items-center text-white font-bold">
            <p class="text-2xl">Editar Foto de Fundo</p>
            <span class="mdi mdi-image-edit text-xl"></span>
            </div>
            <div class="flex flex-col gap-2">
            <div class="flex gap-3 items-center text-white font-bold">
            <p class="text-xl">Editar Cores de Fundo</p>
            <span class="mdi mdi-palette text-xl"></span>
            </div>
            <div class="flex gap-7">
                <div class="flex gap-3">
                    <p>Cor Clara</p>
                    <span :style="{backgroundColor: props.data.background_light_color}" :class="`p-3 rounded-full`"></span>
                </div>
                <div class="flex gap-3">
                    <p>Cor Escura</p>
                    <span :style="{backgroundColor: props.data.background_dark_color}" :class="`p-3 rounded-full`"></span>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        <div class="w-5/12 flex justify-center">
                <AddPlaylistSongs @addToPlaylist="addToPlaylist" :data="songStore.songs" />
        </div>
    </div>
    </section>
    <input class="hidden" type="file" id="photo" @change="handleFileUpload" />
</template>