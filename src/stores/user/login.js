import { defineStore } from "pinia";
import { logininputs } from "@/utils/inputs/login";
import { computed, ref } from "vue";
import { LoginService, UserMeService } from "@/services";
import { useQueueStore } from "../mooner/queue";
import { useStorage } from "@vueuse/core";
import router from "@/router";
const loginservice = new LoginService()
export const useLoginStore = defineStore('login', ()=>{
    const state = useStorage('storage', {
        user: {
            email: '',
            password: '',
            premium: '',
            is_artist: false
        },
        access: '',
        refresh: ''
    })

    const queueStore = new useQueueStore()

    
    const msg = ref(null)
    const err = ref(false)
    const access = computed(() => state.value.access)
    const user = computed(()=> state.value.user)
    
    async function DoLogin(){
        state.value.user.email = logininputs.value[0].value
        state.value.user.password = logininputs.value[1].value
        const token = await loginservice.GetToken(state.value.user)
        if(!token){
            msg.value = 'suas credenciais não foram atingidas, verifique suas credenciais ou crie uma conta'
            err.value = true
        }
        else{
            err.value = false
            msg.value = `logado com sucesso seja muito bem vindo ao Mooner ${logininputs.value[0].value}!`
            state.value.access = token.access
            state.value.refresh = token.refresh
            const me = await UserMeService.getUser(token.access)
            state.value.user.premium = me.premium
            state.value.user.is_artist = me.is_artist
        }
    }

    function AutoLogin(){
        if(state.value.user.email && state.value.user.password){
            DoLogin(state.value.user)
        }
    }   

    function Logout(){
        state.value.access = ''
        state.value.refresh = ''
        state.value.user.email = ''
        state.value.user.password = ''
        queueStore.state.currentSong = null
        localStorage.clear()
        router.push('/login')
    }
    return { DoLogin, Logout, AutoLogin, msg, err, user, state, access }
})