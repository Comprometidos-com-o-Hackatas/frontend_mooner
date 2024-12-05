
<script setup>
import { ref } from 'vue';
import { useQueueStore, useMoonStore, useUserStore } from '@/stores';
import { adjusteSize } from '@/utils/music/music';
import MoonWaveSongs from '@/components/moonWave/MoonWaveSongs.vue'


const queueStore = useQueueStore()
const moonStore = useMoonStore()
const userStore = useUserStore()

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Texto copiado com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
}
const link = `http://127.0.0.1:5174/connect-moon/${userStore.myuser.email}`
const whatsappLink = ref(`https://wa.me/?text=${encodeURIComponent(link)}`);

const open = ref(false)
const coppied = ref(false)
const copy = () => {
    coppied.value = true
    setTimeout(()=>{
        coppied.value = false
        copyToClipboard(link)
    },1000)
    
}
const remove = (id) => {
    queueStore.removeFromQueue(id)
}
</script>
<template>
    <div v-if="moonStore.state.reconnect" :class=" !open ? ' absolute z-[999] right-0 bottom-[70px] flex gap-4 rounded-lg bg-[rgba(14,14,14,0.95)] queue-container flex-col justify-end' : 'absolute z-[999] right-0 bottom-[70px] flex gap-4 rounded-lg bg-[rgba(14,14,14,1)] queue-container-open flex-col justify-end '">
        <div class=" text-[#AA5AF5] openQueue">
            <p class=" text-sm" @click="open = !open">{{open ? 'Voltar' : 'Gerenciar MoonWave'}}</p>
            <span :class=" !open ? 'mdi mdi-arrow-up-circle-outline' : 'mdi mdi-arrow-down-circle-outline'"></span>
        </div>
        <div :class="!open ? 'flex gap-4 w-full justify-center' : 'hidden'">
        <p>MoonWave:</p>
        <p class="text-white">{{ moonStore.state.reconnect ? 'Conectado' : '' }}</p>
        </div>
        <div  v-if="open" class="w-full h-20 relative flex justify-start items-center mt-10 cursor-pointer">
            <div :class="coppied ? 'absolute flex justify-center items-center w-full h-16 bg-[rgba(15,15,15,0.8)] duration-150' : 'hidden'">
                <p class=" text-[#AA5AF5]">Copiado!!!</p>
            </div>
            <div @click="copy()" class="flex gap-2">
                <span class="mdi mdi-link-variant text-xl text-[#AA5AF5]"></span>
                <p class="text-[#7C7C7C] text-sm overflow-hidden w-52 text-nowrap bg-[#252525] rounded-full py-1 px-2 flex">{{ link }}</p>
            </div>
        </div>
        <MoonWaveSongs @eraseQueue="queueStore.state.queue = []" @action="remove" v-if="open" :data_next="queueStore.state.queue" :data="queueStore.state.currentSong" />
        <div v-if="open" class="w-full flex justify-center text-white">
            <div @click="moonStore.disconnectMoonWave()" class="flex gap-3 cursor-pointer hover:bg-[rgba(27,27,27,0.6)] py-1 px-3 rounded-lg">
                <span  class="text-[#AA5AF5] mdi mdi-logout"></span>
                <p class="text-white">Desconectar</p>
            </div>
        </div>
    </div>
</template>
<style scooped>

.openQueue {
    visibility: hidden;
    width: 100%;
    padding: 5px 10px 0px 0px;
    cursor: pointer;
    opacity: 0;
    transition: 0.5s;
    display: flex;
    gap: 5px;
    justify-content: center;
    position: absolute;
    top: 0;
    
}
.queue-container {
    padding: 8px;
    transition: 0.5s;
    height: 40px;
    width: 220px;
    &:hover {
        height: 80px;

        .openQueue {
            visibility: visible;
            opacity: 1;
            
        }
    }
}

.queue-container-open {
    padding: 8px;
    transition: 0.5s;
    max-height: 600px;
    height: 530px;
    width: 280px;
    overflow: auto;
    .openQueue {
            visibility: visible;
            opacity: 1;
            
        }
}
</style>