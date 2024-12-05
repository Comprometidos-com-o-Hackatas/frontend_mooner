<script setup>
    import bgBox from '@/components/community/bgBox.vue';
    import { useCommunityStore, useLoginStore } from '@/stores';
    import { onMounted } from 'vue';

    const CommunityStore = useCommunityStore()
    const LoginStore = useLoginStore()
    
    onMounted( async () =>{
        await CommunityStore.getCommunitys(LoginStore.access)
    })
</script>
<template>
    <div>
        <bgBox :data="CommunityStore.communitys"/>
    </div>
</template>