import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { reactive, computed } from 'vue';
import { usePlayerStore } from './player';



export const useQueueStore = defineStore('queue', () => {
    const state = useStorage('queue', reactive({
        queue: [],
        history: [],
        currentSong: {artists: [],},
        saveOrder: [],
    }))
    const playerStore = usePlayerStore()

    const currentSong = computed(()=> state.value.currentSong)
    const is_playing = computed(()=> state.value.is_playing)
    

    function setCurrentSong(song) {
        if (state.value?.currentSong?.player) { 
            addSongToHistory()
        }
        state.value.currentSong = song;
        playerStore.state.songPlayer.load()
        console.log(state.value.currentSong)
    }

    function addSongToQueue(newSong) {
        console.log(newSong)
        if (state.value.currentSong.player) {
            state.value.queue.push(newSong);
        }   
        else {
            state.value.currentSong = newSong
        }
    }

    function addSongToHistory() {
        state.value.history.push(state.value.currentSong)
        if (state.value.history.length > 10) {
            state.value.history.shift();
        }
    }


    function nextSong() {
        setCurrentSong(state.value.queue.shift());
        playerStore.play()
    }

    function previousSong() {
        state.value.queue.unshift(state.value.currentSong)
        state.value.currentSong = state.value.history.pop();
    }

    function repeatSong() {
        if (state.value.queue[0] && state.value.currentSong.id == state.value.queue[0].id) {
            state.value.queue.shift()
        }
        else {
            state.value.queue.unshift(state.value.currentSong)
        }
    }

    function randomize() {
        if (state.value.saveOrder.length == 0){
            state.value.saveOrder = state.value.queue
            for (let i = state.value.queue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório
                [state.value.queue[i], state.value.queue[j]] = [state.value.queue[j], state.value.queue[i]]; // Troca os elementos
            }
        }
        else {
            state.value.queue = state.value.saveOrder
            state.value.saveOrder = []
        }
    }

    function removeFromQueue(song) {
              const index = state.value.queue.findIndex((s) => s.id === song)  
              state.value.queue.splice(index, 1)  
    }
    
    return {
        state,
        is_playing,
        currentSong,
        setCurrentSong,
        addSongToQueue,
        addSongToHistory,
        nextSong,
        previousSong,
        repeatSong,
        randomize,
        removeFromQueue
    };
});
