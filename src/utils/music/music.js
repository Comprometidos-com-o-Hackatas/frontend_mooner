import {ref, computed} from 'vue'
import { trash, wave, heart, disc, artist, copy, unlike, house, luuna } from "@/assets/images/icons/settingsIndex"
import Logo from '@/assets/images/Logo.png'
import monn from '@/assets/images/monn.jpg'
import router from '@/router'

export const verify_active = ref(false)

export const data =  ref([
    {tittle: 'Remover', img: trash},
    {tittle: 'Iniciar MoonWave', img: wave},
    {tittle: 'Curtir', img: [heart, unlike], liked: false},
    {tittle: 'Album', img: disc},
    {tittle: 'Artista', img: artist},
    {tittle: 'Copiar Link', img: copy},
])

export const adjusteSize = (item, lenght, index) => {
    if (item.length > lenght) {
        item = item.replace(item.substring(index), '') + '...'
    }
    return item
}

export const data_header_icons = ref([
    {icon: house, active: true, comp: 'home'},
    {icon: luuna, active: false, comp: 'luuna'}
])

export const selectIcon = (item) =>{
    for (let i = 0; i < data_header_icons.value.length; i++) {
     data_header_icons.value[i].icon == item.icon ? data_header_icons.value[i].active = true : data_header_icons.value[i].active = false
    }
   } 

export const returnActive = computed(() => {
    const activated = data_header_icons.value.filter(s => s.active == true)
    return activated[0].comp
  })

export const data_section = ref([
    {title: 'Playlists', active: false}, {title: 'Músicas', active: false}, {title: 'Artistas', active: false}
  ])

export const data_page = ref([
    {title: 'Minha Biblioteca', active: true}, {title: 'Navegar', active: false}
  ])

export  const data_music_home = ref([
    {music: [], title: ''}, {music: [], title: 'Recomendamos para você'}, {music: [], title: 'Artistas que Você Gosta'}, {music: [], title: 'Descobertas da Semana'}
  ])

export const selectSection = (index, data, title) => {
    for (let i = 0; i < data.length; i++) {
      data[i].active = i === index ? data[i].active = true : false;
    }
    router.push({name: title})
  };