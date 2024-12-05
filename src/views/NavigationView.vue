<script setup>
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import { data_page, selectSection } from '@/utils/music/music';
import MusicBox from '@/components/global/MusicBox.vue';
import GenreCard from '@/components/searchPage/GenreCard.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import { onMounted, ref } from 'vue';
import HistoryConnect from '@/components/searchPage/HistoryConnect.vue';
import { useLoginStore, useNavigationStore, useSongStore } from '@/stores';
const SongStore = useSongStore()
const LoginStore = useLoginStore()
const navigationStore = useNavigationStore()
const search = ref('')
async function FilterSong(){
    await SongStore.getSongsByName(search.value, LoginStore.access)
}

function getI(i){
    return SongStore.songs.length - i 
}

onMounted(async() =>{
    await SongStore.getSongs(LoginStore.access)
})
</script>
<template>
    <ContainerNavigateButtons class="mt-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item,index in navigationStore?.state?.data_page" :key="index" :title="item.title" :active="item.active" @goSection="navigationStore.selectSection(index, navigationStore.state.data_page, item.title, navigationStore.state.data_section)" />
      </ContainerNavigateButtons>
    <section class="p-5 w-screen">  
        <InputGlobal placeholder="Procure suas músicas aqui...." id="search-music"  v-model:value="search" @input="FilterSong"/>
        <HistoryConnect title="Historico"/>
    </section>
    <section class="p-5 w-screen">
        <h1 class="text-2xl text-white font-bold  ml-8">Em Alta</h1>
        <div class="w-full flex justify-center">
            <div class="flex w-3/4 flex-wrap-reverse flex-row-reverse justify-center gap-2 p-5 items-center ">
                <MusicBox v-for="music, index in SongStore.songs" :is_search_history="true" :has_index="true" :buttons="false" :index="getI(index)" :music_data="music"/>
            </div>    
        </div>
    </section>
    <section class="w-screen p-5 ">
        <h1 class="text-white text-2xl font-bold ml-8" v-if="search.length === 0">Generos Musicais</h1>
        <div class="w-full p-5 flex gap-5 justify-center items-center flex-wrap">
            <GenreCard v-if="search.length === 0" />
            <MusicBox v-for="filtersong in SongStore.songsByTitle" :key="filtersong.id" :music_data="filtersong" v-else-if="search.length > 0 && SongStore.songsByTitle.length > 0"/>
            <h1 class="text-white text-2xl" v-else>Resultados não Encontrados</h1>
        </div>
    </section>
</template>
<style>
#search-music{
    background-color: white;
    height: 35px;
    color: black;
    border: none;
    padding: 10px;
    font-size: 14px;
    width: 100%;
    outline: 0;
    border-radius: 20px
}
</style>