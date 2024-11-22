<script setup>
import { onMounted, ref } from 'vue';
import { usePlayerStore } from '@/stores/mooner/player';
import { useQueueStore } from '@/stores';

const queueStore = useQueueStore();
const playerStore = usePlayerStore();
const songPlayer = ref(null)

onMounted(() => {
    playerStore.state.songPlayer = songPlayer.value
})

</script>

<template>
    <audio ref="songPlayer" class="" :src="queueStore.state.currentSong.player.url"></audio>
</template>