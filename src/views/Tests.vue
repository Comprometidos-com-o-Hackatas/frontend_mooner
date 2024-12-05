<script setup>
import { onMounted } from 'vue';
import { dataHeader } from '@/utils/header/header';
import SideHeader from '@/components/newDesign/SideHeader.vue';
import { useUserStore, useArtistStore, usePlaylistStore, useCommunityStore, useFollowingStore } from '@/stores';

import MoonWaveManagement from '@/components/moonWave/MoonWaveManagement.vue'

const playlistStore = usePlaylistStore()
const userStore = useUserStore()
const artistStore = useArtistStore()
const communityStore = useCommunityStore()
const followingStore = useFollowingStore()


</script>
<template>
    <MoonWaveManagement />
</template>