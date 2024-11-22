import { defineStore } from 'pinia';
import { reactive } from 'vue';


export const usePlayerStore = defineStore('player', () => {
    const state = reactive({
        is_playing: false,
        songPlayer: null
    })

    const play = () => {
        console.log(state.songPlayer);
        state.songPlayer.play()
        state.is_playing = true
    }

    const pause = () => {
        state.songPlayer.pause()
        state.is_playing = false
    }
    const usePlay = () => {
        console.log(state) 
        if (state.is_playing) {
            state.songPlayer.pause()
            state.is_playing = false
        }
        else {
            state.songPlayer.play()
            state.is_playing = true
        }
    }

    return {
        state,
        play,
        pause,
        usePlay,
    }
})