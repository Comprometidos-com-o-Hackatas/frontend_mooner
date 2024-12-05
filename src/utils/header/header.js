import luuna from '@/assets/images/luuna.png'
import { reactive, ref } from 'vue'

export const dataHeader = reactive({
    playlist: {
        name: 'playlist',
        content: [],
    },
    artist: {
        name: 'artists',
        content: [],
    },
    community: {
        name: 'community',
        content: [],
    }
})

export const headerInfo = ref([
    {title: 'Página Inicial', icon: 'mdi mdi-home-variant', to: '/'},
    {title: 'Luuna', icon: luuna, to: '/luuna'},
    {title: 'Playlists', icon: 'mdi mdi-playlist-music', isList: true, name: 'playlist', active: false, add: true},
    {title: 'Artistas', icon: 'mdi mdi-account-music', isList: true, name: 'artist', active: false, add: false},
    {title: 'Comunidades', icon: 'mdi mdi-account-group', isList: true, name: 'community', active: false, add: true},
])