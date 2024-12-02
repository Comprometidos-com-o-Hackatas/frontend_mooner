import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { reactive, onMounted } from 'vue';
import { MoonWaveService } from '@/services';
import { useQueueStore } from './queue';
import { usePlayerStore } from './player';

export const useMoonStore = defineStore('moonWave', () => {
    const state = useStorage('socket', reactive({
        socket: null,
        channel: "",
        reconnect: false,
    }))

    const queueStore = new useQueueStore();
    const playerStore = new usePlayerStore();


    const connectMoonWave = async (channel) => {
        try {
            const response = await MoonWaveService.createMoonWave(channel)
            state.value.channel = channel
            state.value.socket = response
            state.value.reconnect = true
            console.log("Instância de WebSocket:", response instanceof WebSocket);
            //state.value.socket.onopen(() => {
            //   sendActionLink()
            //})
            console.log(state.value.socket)
        }
        catch (error) {
            console.log('pse ne pae', error)
        }
    }

    const disconnectMoonWave = async () => {
        if (state.value.socket) {
            state.value.socket.close();
            state.value.socket = null;
            state.value.reconnect = false
            console.log('WebSocket desconectado');
        }
    };


    const sendActionSync = async (song, currentTime, queue) => {
        try {
            const message = JSON.stringify({ "song": song, "timestamp": currentTime, "queue": queue })
            state.value.socket.send(message)
            console.log('Mensagem enviada com sucesso:', message)
          } catch (error) {
            console.error('Erro ao enviar a mensagem:', error)
          }
    }

    const sendActionLink = async () => {
        try {
            const message = JSON.stringify({ "action": "link"})
            state.value.socket.send(message)
            console.log('Mensagem enviada com sucesso:', message)
          } catch (error) {
            console.error('Erro ao enviar a mensagem:', error)
          }
    }
    
    onMounted(() => {
        if (state.value.reconnect) {
            console.log("Reconectando ao WebSocket...");
            connectMoonWave(state.value.channel);
        }
    })
    
    return {
        state,
        connectMoonWave,
        disconnectMoonWave,
        sendActionSync,
    }
})