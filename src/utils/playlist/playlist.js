import {ref} from 'vue'
import { usePlaylistStore, useUserStore, useImgStore, useQueueStore, useLoginStore } from "@/stores"
import { useRoute } from 'vue-router'
let playlistStore = null
let userStore = null
let imgStore = null
let queueStore = null
let loginStore = null
let token = null
const router = useRoute()

setTimeout(()=>{
  playlistStore = usePlaylistStore()
  userStore = useUserStore()
  imgStore = useImgStore()
  queueStore = useQueueStore()
  loginStore = useLoginStore
},500)
export async function handleFileUpload(e, img, saveimg) {
    const target = e.target
    if (target && target.files) {
      const file = target.files[0]
      img.value = URL.createObjectURL(file)
      saveimg.value = file
    }
  }
  
export const transformToId = () => {
    for (let i = 0; i < playlistStore.newPlaylist.songs.length; i++) {
      playlistStore.newPlaylist.songs[i] = playlistStore.newPlaylist.songs[i].id
    }
  }

  const updateBody = async (playlist, token, id) => {
    await playlistStore.updatePlaylist(playlist, token)
  }
  
export const updatePlaylists = async (playlist, token, image, songs, id) => {
    playlistStore.state.selectedPlaylist.songs = playlistStore.state.selectedPlaylist.songs.concat(songs)
    playlistStore.newPlaylist.owners.push(userStore.myuser.email)
    if (image != null) {
      await imgStore.CreateNewImg(image, token).then((response) => {
        playlistStore.attach = response
      })
      await imgStore.GetImagesByAttachment_key(playlistStore.attach, token)
      playlistStore.newPlaylist.cover = imgStore.selectedImage.attachment_key
    } else {
      playlistStore.newPlaylist.cover = playlistStore.selectedPlaylist.cover.attachment_key
    }
    playlistStore.newPlaylist.songs = songs
  
    setTimeout(() => {
      if (playlistStore.selectedPlaylist.songs.length > 0) {
        playlistStore.newPlaylist.songs = songs.concat(playlistStore.selectedPlaylist.songs)
      } else {
        playlistStore.newPlaylist.songs = songs
      }
  
      playlistStore.state.selectedPlaylist.songs.concat(playlistStore.newPlaylist.songs)
      transformToId()
      updateBody(playlist, token)

    }, 500)

  
  }

  export const saveData = ref(null)
  
  export const captureEmit = (data_add) => { 
    saveData.value = data_add
   }
  
export const addToPlaylist = (data_add, songs, token) => {
    const index = songs.findIndex((s) => s.id == data_add.song.id)
    const indexInPlaylist = playlistStore.selectedPlaylist.songs.findIndex((s) => s.id == data_add.song.id)
    if (data_add.action == 'add') {
    if (playlistStore.selectedPlaylist.songs.filter((s) => s.id == data_add.song.id).length > 0) {
      playlistStore.selectedPlaylist.songs.splice(index, 1)
     
    } else {
      songs.push(data_add.song)
    }
  } else if (data_add.action == 'remove') {
    if (playlistStore.selectedPlaylist.songs.filter((s) => s.id == data_add.song.id).length > 0) {
      playlistStore.state.selectedPlaylist.songs.splice(indexInPlaylist, 1)
      songs.splice(index, 1)
      updatePlaylists(playlistStore.showNewPlaylist, token, null, songs)
    }
  }
  }  

  
export const playAndQueue = (songs) => {
    queueStore.state.queue = songs
  }
  