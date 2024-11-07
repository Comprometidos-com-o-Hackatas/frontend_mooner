<script setup>
import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
import HeaderGlobal from '@/components/global/HeaderGlobal.vue';
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
import { data_page, selectSection } from '@/utils/music/music';
import MusicBox from '@/components/global/MusicBox.vue';
import GenreCard from '@/components/searchPage/GenreCard.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import { ref } from 'vue';
import HistoryConnect from '@/components/searchPage/HistoryConnect.vue';
import { useLoginStore, useSongStore } from '@/stores';
const SongStore = useSongStore()
const LoginStore = useLoginStore()
const search = ref('')
const musics = [
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    }, {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    }, {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    }, {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },
    {
        title: 'teste2',
        cover:{
            url: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        }
    },

]

async function FilterSong(){
    const store = await SongStore.getSongsByName(search.value, LoginStore.access)

}
</script>
<template>
    <HeaderGlobal/>
    <ContainerNavigateButtons>
        <NavigateHomeButtons  :has_active_bg="true" v-for="item,index in data_page" :key="index" :title="item.title" :active="item.active" @goSection="selectSection(index, data_page, item.title)" />
    </ContainerNavigateButtons>
    <section class="p-5 w-screen">  
        <InputGlobal placeholder="Procure suas músicas aqui...." id="search-music"  v-model:value="search" @input="FilterSong"/>
        <HistoryConnect title="Historico"/>
    </section>
    <section class="p-5 w-screen">
        <h1 class="text-2xl text-white font-bold  ml-8">Em Alta</h1>
        <div class="w-full flex justify-center">
            <div class="flex w-3/4 flex-wrap-reverse justify-center gap-2 p-5 items-center ">
                <MusicBox v-for="music, index in musics" :is_search_history="true" :has_index="true" :buttons="false" :index="index + 1" :music_data="music"/>
            </div>    
        </div>
    </section>
    <section class="w-screen p-5 ">
        <h1 class="text-white text-2xl font-bold ml-8" v-if="search.length === 0">Generos Musicais</h1>
        <div class="w-full p-5 flex gap-5 justify-center items-center flex-wrap">
            <GenreCard v-if="search.length === 0" />
            <MusicBox v-for="filtersong in SongStore.songsByTitle" :key="filtersong.id" :music_data="filtersong" v-else/>
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