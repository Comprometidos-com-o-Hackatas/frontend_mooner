<script setup>
    import AuthComp from '@/components/auth/AuthComp.vue';
    import { logininputs } from '@/utils/inputs/login';
    import { useLoginStore } from '@/stores';
    import MsgGlobal from '@/components/global/MsgGlobal.vue';
    import router from '@/router';
    import { storage } from '@/utils/storage/apresentation';
    
    const store = useLoginStore()
    function gotoplans(is_logged){
        if(!is_logged){
            store.msg = ''
            store.is_logged = true
            storage.value.apresentation = true
            router.push('/')
        }
        else{
            store.msg = ''
        }
    }
</script>
<template>
    <MsgGlobal v-show="store.msg" :err="store.err" :msg="store.msg" @confirm="gotoplans"/>
    <AuthComp :is_login_page="true"  :inputs_page="logininputs" :action_btn="store.DoLogin" />
</template>