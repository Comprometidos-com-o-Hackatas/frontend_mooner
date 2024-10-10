<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import api from '@/plugins/api';
import { useLoginStore } from '@/stores';
import { useLunnaIAStore } from '@/stores';
import { onMounted, onUpdated, ref} from 'vue';
import LunaChat from './LunaChat.vue';
const useranswer = ref('')
const storeLunna = useLunnaIAStore()
const storeUser = useLoginStore()
const pagina = ref(1)
const chat = ref(null)
const user = ref(null)
const counter = ref(0)

async function Answer(){
    counter.value = 0
    storeLunna.CreateAnswer({usuario: user.value, answer: useranswer.value}, storeUser.state.access)
    useranswer.value = ''
} 

const scrolltoEnd = () =>{
    if(chat.value){
        chat.value.scrollTop = chat.value.scrollHeight
    }
}

async function getPagination(token, command){
    if(command === 'next'){
        pagina.value++
        counter.value = 0
        await storeLunna.GetChat(token, pagina.value)
    }
    else {
        pagina.value--
        counter.value = 0
        await storeLunna.GetChat(token, pagina.value)
    }
}

onUpdated(async() =>{
    const token = storeUser.state.access
    await storeLunna.GetChat(user.value, token, pagina.value)
    counter.value++
    if(counter.value <= 50){
        scrolltoEnd()
    }   
})

onMounted( async () =>{
    const token = storeUser.state.access
    const response = await api.get('usuarios/me/', {
        headers:{
            Authorization: `Bearer ${storeUser.state.access}`
        } 
    })
    await storeLunna.GetChat(response.data.id, token, 1)
    user.value = response.data.id
    scrolltoEnd()
})
</script>
<template>
    <div class="lunna-container">
        <div class="pagination" :style="storeLunna.chat.next && !storeLunna.chat.previous  ? {justifyContent: 'end'} : {justifyContent: 'space-between'}">
            <p @click="getPagination(storeUser.state.access, 'previous')" v-if="storeLunna.chat.previous" id="prev">anterior</p>
            <p @click="getPagination(storeUser.state.access, 'next')" v-if="storeLunna.chat.next" id="next">proximo</p>
        </div>
        <div class="luuna-desc">
            <img src="../../../assets/images/luuna.png">
            <h1>Ola eu sou Lunna</h1>
        </div>
        <div >
            <div class="chat-container" ref="chat">
                <LunaChat v-for="chat in storeLunna.chatorder" :key="chat.id" :answer="chat.answer" :response="chat.response"/>
            </div>
            <div class="lunna-chat">
                <InputGlobal placeholder="ola" id="luuna-input" v-model:value="useranswer"/>
                <ButtonGlobal width="60px" height="55px" background="#6340AE" border="none" border_radius="20px"  :is_arrow="true" @click="Answer"/>
            </div>
        </div>
    </div>
</template>