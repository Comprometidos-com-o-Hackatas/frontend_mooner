<script setup >
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { ref } from 'vue';
import { useArtistStore, useLoginStore } from '@/stores';
import { useSongStore } from '@/stores';
const SongsStore = useSongStore()
const ArtistStore = useArtistStore()
const LoginStore = useLoginStore()
const searchartist = ref('')
const feats = ref([])

async function filterArtists(){
    const response = await ArtistStore.getArtistsByName(searchartist.value, LoginStore.access)
}

function addfeats(){
    feats.value.push(searchartist.value)
    SongsStore.newsong.artists.push(ArtistStore.artistsByName[0].user)
    searchartist.value = ''
}   

</script>
<template>
    <div class="flex flex-col justify-center w-full  items-center gap-5">
        <div class="flex justify-center w-full items-center gap-2">
            <p class="text-lg text-white font-extralight">Participantes</p>
            <input type="text"   v-model="searchartist" class="text-xs text-white outline-0 p-1 pl-1  w-full rounded-2xl bg-neutral-700" @input="filterArtists">
            <ButtonGlobal title="+" font_size="15px" border_radius="9999px" class="flex justify-center items-center" width="20px" height="20px" background="white" @click="addfeats" />
        </div>
        <input disabled :value="feats" class="w-full bg-neutral-700 rounded-2xl text-purple-600 p-2">
        <div class="w-[292px] text-[10px] bottom-[-280px] p-2 flex justify-center flex-col left-[615px] h-6 bg-zinc-600 text-white absolute " v-if="searchartist">
            <p v-for="artist in ArtistStore.artistsByName" class="text-white w-full hover:bg-purple-700" :key="artist.id" v-if="ArtistStore.artistsByName.length > 0">{{ artist.artistic_name }}</p>
            <p v-else>resultados não encontrados</p>
        </div>
    </div>
</template>