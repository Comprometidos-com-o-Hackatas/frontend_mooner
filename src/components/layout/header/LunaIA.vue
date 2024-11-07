<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import api from '@/plugins/api';
import { useLoginStore, useUserStore } from '@/stores';
import { useLunnaIAStore } from '@/stores';
import { onMounted, onUpdated, ref} from 'vue';
import LunaChat from './LunaChat.vue';
import { UserMeService } from '@/services';
const useranswer = ref('')
const storeLunna = useLunnaIAStore()
const storeUser = useLoginStore()
const userStore = useUserStore()
const pagina = ref(1)
const chat = ref(null)
const user = ref(null)
const counter = ref(0)

async function Answer(){
    counter.value = 0
    storeLunna.CreateAnswer({usuario: userStore.myuser.email, answer: useranswer.value}, storeUser.state.access)
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
    await storeLunna.GetChat(userStore.myuser.email, token, pagina.value)
    counter.value++
    if(counter.value <= 50){
        scrolltoEnd()
    }   
})

onMounted( async () =>{
    const token = storeUser.state.access
    await storeLunna.GetChat(userStore.myuser.email, token, pagina.value)

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
        <div>
            <div class="chat-container mb-2" ref="chat">
                <LunaChat v-for="chat in storeLunna.chatorder" :key="chat.id" :answer="chat.answer" :response="chat.response"/>
            </div>
            <div class="lunna-chat">
                <InputGlobal placeholder="ola" id="luuna-input" v-model:value="useranswer"/>
                <ButtonGlobal class="flex justify-center items-center"width="50px" height="40px" background="#6340AE" border="none" border_radius="10px"  :is_arrow="true" @click="Answer"/>
            </div>
        </div>
    </div>
</template>