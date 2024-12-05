import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { PlaylistService } from '@/services'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import { usePlaylistStore } from '../mooner/playlists'



export const useNavigationStore = defineStore('navigation', () => {
    const playlistStore = usePlaylistStore()
  const state = useStorage('navigation', {
    data_section: [
        {title: 'Geral', active: true},
    {title: 'Playlists', active: false}, {title: 'Músicas', active: false}, {title: 'Artistas', active: false},
    ],
    data_page: [
        {title: 'Minha Biblioteca', active: true}, {title: 'Navegar', active: false}
    ],
  })

  const simpleState = reactive({
    page: 1,
    break: false
  })

  const selectSection = (index, data, type, data_section) => {
    localStorage.removeItem('navigation')
    for (let i = 0; i < data.length; i++) {
      data[i].active = i === index ? data[i].active = true : data[i].active = false;      
    }

    if (data_section) {
        for (let i = 0; i < data_section.length; i++) {
           data_section[i].active = i === index ? data_section[i].active = true : data_section[i].active = false;      
          }
    }

    if (type == 'navigate') {

    data[index].title == 'Músicas' ? router.push('/musics') : data[index].title == 'Playlists' ? router.push('/playlists') : data[index].title == 'Artistas' ? router.push('/artists') : router.push('/')
  } else {
    data[index].title == 'Minha Biblioteca' ? router.push('/') : router.push('/navigation')
  }
  };

  const nextPage = async () => {
    if (!simpleState.break) {
    simpleState.page += 1
    console.log(simpleState.page)
    }
}

  const previousPage = async () => {
    if (simpleState.page > 1) {
    simpleState.page -= 1
    simpleState.break = false
    console.log(simpleState.page)
  }
}

  return {
    state,
    simpleState,
    selectSection,
    nextPage,
    previousPage
  }
})