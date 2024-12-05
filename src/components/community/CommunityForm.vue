<script setup>
import ButtonGlobal from '../global/ButtonGlobal.vue';
import InputGlobal from '../global/InputGlobal.vue';
import { CommunityInput } from '@/utils/inputs/infoCommunity';
import PerfilPhoto from '../user/artist/PerfilPhoto.vue';
import { useCommunityStore, useLoginStore } from '@/stores';
const CommunityStore = useCommunityStore()
const LoginStore = useLoginStore()

async function CreateCommunity(){
    CommunityStore.CommunityData.autor = LoginStore.user.email
    CommunityStore.CommunityData.name = CommunityInput.value[0].value
    CommunityStore.CommunityData.description = CommunityInput.value[1].value
    await CommunityStore.createCommunity(LoginStore.access)
}
    
</script>
<template>
    <div class="w-2/4 p-3 flex flex-col items-center">
        <PerfilPhoto :isCommunity="true" />
        <InputGlobal v-for="data, index in CommunityInput" :key="index" :field_name="data.fieldname" :type="data.type" v-model:value="data.value" container_class="artist-fields-container p-2"/>
        <ButtonGlobal title="Criar Comunidade" background="purple" color="white" width="250px" border_radius="10px" font_size="17px" @click="CreateCommunity"/>
    </div>
</template>