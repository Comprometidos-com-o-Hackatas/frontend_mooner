<script setup>
    defineProps({
        is_premium: {
            type: Boolean,
            required: true,
            default: false
        },
        is_artist:{
            type: Boolean,
            required: true
        }, 
        logout: {
            type: Function,
            required: true
        }
    })
</script>
<template>
    <div>
        <div class="flex flex-col ">
            <RouterLink class="flex items-center gap-2 w-full" to="/user"><i class="mdi mdi-account-outline"></i>Perfil</RouterLink>
            <RouterLink class="flex items-center gap-2 w-full" :to="is_artist ? '/artistpainel' : '/beanartist'"><i class="mdi mdi-star-outline"></i>{{ is_artist ? 'Painel de Artista' : 'Seja um artista'}}</RouterLink>
            <RouterLink class="flex items-center gap-2 w-full" v-if="!is_premium" to="/plans"><i class="mdi mdi-diamond-stone"></i>Seja Premium</RouterLink>
            <p @click="logout" class="cursor-pointer"><i class="mdi mdi-logout"></i>Encerrar sessão</p>
        </div>
    </div>
</template>
<style scoped>
    a, p{
        font-weight: 200;
    }
    
    .mdi-star-outline, .mdi-account-outline, .mdi-logout{
        font-size: 20px;
    }
</style>