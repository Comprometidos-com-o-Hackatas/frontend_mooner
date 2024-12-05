
<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  useArtistStore,
  useLoginStore,
  usePlaylistStore,
  useUserStore,
} from '@/stores/index'

import monn from '@/assets/images/monn.jpg'
import { adjusteSize } from '@/utils/music/music'
import ButtonGlobal from '@/components/global/ButtonGlobal.vue'

const loginStore = useLoginStore()
const artistStore = useArtistStore()
const playlistStore = usePlaylistStore()
const userStore = useUserStore()

const token = loginStore.access
const songs = ref([])

const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  play: {
    type: Boolean,
    default: false
  },
  img: {
    type: Object,
  },
  saveimg: {
    type: Object,
  },
})

const emits = defineEmits([
  'updatePlaylist',
  'playAndQueue',
  'sendEmitData',
  'isEdit',
  'isPlay'
])

const data = reactive({
  playlist: playlistStore.showNewPlaylist,
  token: token,
  image: props.saveimg,
  songs: songs.value
})

const userInfo = ref(null)
const desc = ref(null)

onMounted(async()=>{
    await userStore.getUsers(token)
    console.log(artistStore.selectedArtist.user)
    
    const index = userStore.users.findIndex((s) =>  s.email == artistStore.selectedArtist.user)
    userInfo.value = userStore.users[index]
    console.log(artistStore.selectedArtist)
    console.log(userStore.myuser.email)
    desc.value = adjusteSize(userInfo.value.description, 230, 230)
})

const showState = ref(false)
const buttonText = ref('Ver Mais...')

const showMore = () => {
  if (showState.value == false) {
    showState.value = true 
  desc.value = adjusteSize(userInfo.value.description, userInfo.value.description.length, userInfo.value.description.length)
  buttonText.value = 'Ver Menos'
  } else {
    showState.value = false 
    desc.value = adjusteSize(userInfo.value.description, 230, 230)
    buttonText.value = 'Ver Mais...'
  }
}

</script>

<template>
 <div class="w-4/12 lg:w-full overflow-y-auto lg:overflow-auto overflow-x-hidden h-full lg:h-[800px] flex flex-col relative rounded-l-lg ">
        <div class=" w-full h-full max-h-full flex justify-center overflow-auto relative">
          <div class="absolute top-8 left-8 z-30 flex gap-3 items-center w-full justify-between">
            <div v-if="userInfo != null ? userInfo.email == userStore.myuser.email : ''"
              @click="emits('isEdit')"
              :class="{ edit: props.edit }"
              class="flex mr-8 items-center justify-center gap-2 cursor-pointer relative w-[20%] lg:w-[90px]"
            >
              <i class="mdi mdi-file-edit text-white text-xl icon"></i>
              <p :class="{ text_edit: props.edit }" class="text-white text-base duration-100 edit-text">
                Editar
              </p>
            </div>
          </div>

          <div class="w-[100%] h-[75%] absolute z-30 mt-16 lg:mt-20 flex flex-col gap-3 sm:gap-10 items-center">
            <div class="w-[70%] h-[55%] relative rounded-lg lg:w-[70%] lg:h-[80%] sm:w-[70%] sm:h-[100%] xsm:h-[70%] xsm:w-[90%]">
            <label
              for="photo"
              v-if="props.edit"
              class="lg:rounded-lg w-full h-full hover:bg-[rgba(0,0,0,0.8)] bg-[rgba(0,0,0,0.6)] duration-150 absolute z-40 flex justify-center items-center cursor-pointer"
            >
              <i class="mdi mdi-image-edit sm:text-5xl text-white text-8xl"></i>
            </label>
            <img
              class="w-full h-full rounded-lg"
              :src="userInfo != null ? userInfo?.perfil?.url : ''"
            />

           
          </div>

            <h2 v-if="!props.edit" class="text-[32px] font-inter text-white text-center font-semibold">
              {{ artistStore.selectedArtist.artistic_name ? adjusteSize(artistStore.selectedArtist.artistic_name, 28, 28) : '' }}
            </h2>
            <input
              class="w-[70%] lg:h-[55%] sm:h-16 lg:w-[70%] sm:w-[70%] xsm:w-[90%] text-white pl-3 bg-[rgba(255,255,255,0.22)] border-b-2 rounded-t-sm outline-none"
              v-else
              type="text"
              v-model="artistStore.selectedArtist.artistic_name"
            />

            <div class="w-9/12 min-h-44 overflow-auto flex justify-center">
            <p class="text-white text-justify">{{ desc }}</p>
          </div>   
            <!-- w-[70%] h-[55%] relative rounded-lg lg:w-[70%] lg:h-[80%] sm:w-[70%] sm:h-[100%] xsm:h-[70%] xsm:w-[90%] -->
          
            <div class="p-5 flex flex-col gap-5">
            <ButtonGlobal
              @click="showMore()"
              :title="buttonText"
              background="#6340AE"
              border_radius="10px"
              color="white"
            />

            <ButtonGlobal
              v-if="edit"
              @click="emits('sendEmitData', data), emits('updatePlaylist')"
              title="Salvar Alterações"
              background="#6340AE"
              border_radius="10px"
              color="white"
            />
          </div>
          </div>

         
          
          <div class="h-dvh w-full rounded-l-lg lg:rounded-none image opacity-[90%]" :style="`background-image: url(${userInfo != null ? userInfo?.perfil?.url : ''});`"></div>
          <div class=" w-full h-dvh lg:h-[110%] lg:opacity-100 lg:bg-none absolute top-0 opacity-[90%] rounded-l-lg lg:rounded-none overlay"></div>
        </div>
      </div> <!---->
</template>

<style scoped>
.edit-text {
  transition: 1s;
  position: absolute;
  right: 0;
}

.overlay {
  background: rgb(18,18,18);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(0, 0, 0) 50%);
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

@media (max-width: 1024px) {
  .overlay {
    background: rgb(18,18,18);
    background: linear-gradient(180deg, rgba(18,18,18,0.5467436974789917) 0%, rgba(18,18,18,1) 76%);
  }

  .edit {
  width: 90px;
  transition: 0.5s;
  background-color: aquamarine;

  & .text_edit {
    transition: 0.3s;
    opacity: 0;
  }
  & .icon {
    left: 45px;
    font-size: 30px;
  }
}
}

.image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
