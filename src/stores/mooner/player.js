import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const usePlayerStore = defineStore('player', () => {
    const state = reactive({
        is_playing: false,
        songPlayer: null
    })

    const play = () => {
        state.value.songPlayer.play()
        state.value.is_playing = true
    }

    const pause = () => {
        state.value.songPlayer.pause()
        state.value.is_playing = false
    }
    const usePlay = () => {
        if (state.value.is_playing) {
            state.value.songPlayer.pause()
            state.value.is_playing = false
        }
        else {
            state.value.songPlayer.play()
            state.value.is_playing = true
        }
    }

    return {
        state,
        play,
        pause,
        usePlay,
    }
})