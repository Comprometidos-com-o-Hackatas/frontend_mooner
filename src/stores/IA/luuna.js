import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { LunnaIAService } from "@/services";

export const useLunnaIAStore = defineStore('IA', () =>{
    const lunnaService = new LunnaIAService()
    
    const chat = ref([])
    
    async function CreateAnswer(UserAwswer, token){
        await lunnaService.LuunaCreateResponse(UserAwswer, token)
    }
    async function GetChat(user, token, page){
        chat.value = await lunnaService.GetLunnaChat(user, token, page)
    }

    const chatorder = computed(() =>{
        if(chat.value.results){
            return chat.value.results.sort((a, b) => a.id - b.id)
        }
    })


    return { CreateAnswer, GetChat, chatorder, chat }
})