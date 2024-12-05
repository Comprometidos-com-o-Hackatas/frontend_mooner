<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCommunityStore, useLoginStore } from '@/stores';
const CommunityStore = useCommunityStore()
const route = useRoute()
const LoginStore = useLoginStore()
const route_id = route.params.id
const info = ref([])

const communityPosts = reactive({
    description: '',
    autor: LoginStore.user.email,
    community: route_id
})


onMounted( async () => {
    const community = await CommunityStore.getCommunitys(LoginStore.access)
    const FindCommunity = community.find(c => c.id === Number(route_id))

    info.value = FindCommunity
    await CommunityStore.getCommunitysPostsByCommunity(route_id, LoginStore.access)
})
</script>
<template>
    <div class="w-full">
        <div class="h-32 w-full flex">
            <img :src="info?.cover?.url"  class="w-full h-24 absolute">
            <img class="z-10 w-20 h-20 rounded-full ml-10 mt-2" src="https://tse1.mm.bing.net/th?id=OIP.lzt_MmLU-zP9jao6-x_wnAHaHU&pid=Api&P=0&h=180">
            <h1 class="z-10 text-5xl left-10 ml-5 mt-1 font-extralight text-white">{{info.name}}</h1>
        </div>
        <div class="h-[425px] overflow-auto w-3/4 flex flex-col  items-end gap-5  ml-20">
            <div v-for="item in CommunityStore.communitysPostsByCommunity" :key="item.id"  class="w-16 h-10 p-2 rounded-xl bg-purple-700 text-white">
                <p>{{ item.description }}</p>
            </div>
        </div>
        <div class="flex justify-center gap-2">
            <InputGlobal placeholder="ola" id="luuna-input" v-model:value="communityPosts.description"/>
            <ButtonGlobal class="flex justify-center items-center" width="50px" height="40px" background="#6340AE" border="none" border_radius="10px"  :is_arrow="true" @click="CommunityStore.createCommunityPost(communityPosts, LoginStore.access)"/>
        </div>
    </div>
</template>