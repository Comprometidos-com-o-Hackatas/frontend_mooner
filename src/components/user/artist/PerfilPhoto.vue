<script setup>
import { onMounted, ref } from 'vue';
import { filterclasses, textfilter } from '@/utils/artist/artistfilters';
import { useCommunityStore, useSongStore } from '@/stores';
import { useAlbumStore } from '@/stores/mooner/albuns';
import { useDocumentStore, useImgStore, useLoginStore } from '@/stores';
import { fileToDataURL } from '@/utils/file/convertBase64';
const SongStore = useSongStore();
const DocumentStore = useDocumentStore();
const LoginStore = useLoginStore()
const AlbumStore = useAlbumStore();
const ImgStore = useImgStore();
const CommunityStore = useCommunityStore()

const audioview = ref(null);
const musicerrmsg = ref(null);
const imageerrmsg = ref(null);
const imageview = ref(null);

const props = defineProps({
    is_music: {
        type: Boolean,
        required: true
    },
    isAlbum: {
        type: Boolean,
        required: true
    },
    isCommunity: {
        type: Boolean,
        required: true,
    }
});

async function changefile(e) {
    const file = e.target.files[0];
    if (file.type.startsWith("image/") && props.is_music) {
        imageview.value = await fileToDataURL(file);
        imageerrmsg.value = '';
        SongStore.newsong.cover = await ImgStore.CreateNewImg(file, LoginStore.access);
    } else if (file.type.startsWith("image/") && props.isAlbum) {
        AlbumStore.stateStorage.file = await fileToDataURL(file);
        imageview.value = AlbumStore.stateStorage.file
        AlbumStore.stateStorage.cover = await ImgStore.CreateNewImg(file, LoginStore.access);
        imageerrmsg.value = '';
    }
    else if(file.type.startsWith("image/") && props.isCommunity){
        imageview.value = await fileToDataURL(file);
        CommunityStore.CommunityData.cover = await ImgStore.CreateNewImg(file, LoginStore.access);
        imageerrmsg.value = '';
    }
    else {
        imageerrmsg.value = 'Arquivo incompatível';
    }
}

async function changeaudio(e) {
    const file = e.target.files[0];
    if (file.type === "audio/mpeg") {
        audioview.value = URL.createObjectURL(file);
        musicerrmsg.value = '';
        SongStore.newsong.player = await DocumentStore.CreateNewDoc(file, LoginStore.access);
    } else {
        musicerrmsg.value = 'Selecione um arquivo MP3';
    }
}

onMounted(async() =>{
    if(props.isAlbum && AlbumStore.stateStorage.file){
        imageview.value = AlbumStore.stateStorage.file
        SongStore.newsong.cover = AlbumStore.stateStorage.cover
    }
})
</script>
<template>
    <div class="flex flex-col gap-32">
        <label for="perfil" :class="imageerrmsg ? 'w-72 h-72 text-red-500 flex flex-col gap-2 justify-center items-center' : filterclasses(is_music, isAlbum, isCommunity, imageerrmsg)">
            <div class="flex flex-col size-7 border border-dotted w-full h-full justify-center items-center gap-5">
                <span v-if="!imageview" class="text-5xl text-center">+</span>
                <img :src="imageview" class="w-full h-full" v-else>
            </div>
            <span class="font-extralight">{{ imageerrmsg ? imageerrmsg : textfilter(is_music, isAlbum, isCommunity, musicerrmsg) }}</span>
        </label>
        <label for="audio" v-if="is_music">
            <div :class="musicerrmsg ? 'flex  flex-col text-red-500 gap-2' : 'flex flex-col text-white gap-2'">
                <span class="font-extralight">Obs: apenas arquivo <b>mp3</b></span>
                <span v-if="!audioview" class="border border-dotted p-3 text-lg text-purple-700 font-extralight ">Selecione...</span>
                <audio v-else :src="audioview" controls></audio>
                <span class="font-extralight">{{ musicerrmsg ? musicerrmsg : 'selecione o arquivo de sua musica' }}</span>
            </div>
            <div>
            </div>
        </label>
    </div>
    <input type="file" id="perfil" @change="changefile">
    <input type="file" id="audio" @change="changeaudio">
</template>