<script setup>
import { adjusteSize } from '@/utils/music/music';
import { onMounted } from 'vue';
import MoonWaveMusicBox from './MoonWaveMusicBox.vue';
const props = defineProps({
    data: {
        type: Object
    },
    data_next: {
        type: Array
    }
})

const emits = defineEmits([
    'action', 'eraseQueue'
])

const getID = (id) => {
    emits('action', id)
}

</script>
<template>
<div class="h-[90%] appear ">
            <p class="flex w-full pl-4 text-xl">Tocando</p>
            <div class="flex w-full justify-between">
                <MoonWaveMusicBox :data="props.data" />
            </div>
            <div class="flex justify-between w-full items-center">
            <p class="pl-4 text-xl">A seguir</p>
            <p class="pr-4 text-[12px] text-[#AA5AF5] cursor-pointer hover:brightness-50" @click="emits('eraseQueue')">Limpar Fila</p>
        </div>
            <div class="flex flex-col w-full gap-5 overflow-auto">
                <p v-if="props.data_next.length == 0" class="text-gray-200 text-center">Sem Músicas na Fila</p>
                <MoonWaveMusicBox @action="getID" is_queue="true" v-else v-for="item in props.data_next" :data="item" />
            </div>
        </div>
</template>

<style scoped>
.appear {
    display: flex;
    align-items: center;
    color: white;
    flex-direction: column;
    gap: 20px;
    animation-name: open;
    animation-duration: 1000ms;
    animation-iteration-count: 1;
}

@keyframes open {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>