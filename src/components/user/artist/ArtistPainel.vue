<script setup>
    import ContainerNavigateButtons from '@/components/buttons/ContainerNavigateButtons.vue';
    import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';
    import RealizeSong from './RealizeSong.vue';
    import RealizeAlbum from './RealizeAlbum.vue';
    import { useArtistProgress, useSongStore, } from '@/stores';
    const ArtistProgressStore = useArtistProgress()
    const songStore = useSongStore()

    function selectSection(i){
        ArtistProgressStore.state.Select_song_option.forEach((obj, index) =>{
            obj.active = index === i
        })
    }
    defineProps({
        fields: {
            type: Array,
            required: true
        }
    })

    async function createsong(token, artist){
         await songStore.createSong(ArtistProgressStore.state.artist_create_song_fields[0].value, ArtistProgressStore.state.artist_create_song_fields[1].value, ArtistProgressStore.state.artist_create_song_fields[2].value, token, artist)
    }
</script>
<template>
<div class="flex w-full flex-col">
    <h1 class="text-center text-4xl mt-24 text-white font-extralight">Lance sua nova obra!</h1>
    <h2 class="text-center text-base text-white font-extralight">Sera uma musica ou album?</h2>
    <ContainerNavigateButtons class="p-5">
        <NavigateHomeButtons :has_active_bg="true" v-for="item, index in ArtistProgressStore.state.Select_song_option" :key="index" :title="item.title"
            :active="item.active" @goSection="selectSection(index, data_page)" />
    </ContainerNavigateButtons>
    <RealizeSong :fields="fields" :msg="songStore.msg" :err="songStore.err"  @createsong="createsong" v-if="ArtistProgressStore.state.Select_song_option[0].active"/>
    <RealizeAlbum :fields="fields" v-if="ArtistProgressStore.state.Select_song_option[1].active"/>
</div>
</template>