<script setup>
const props = defineProps({
    width: {
        type: String,
        default: 'w-full'
    },
    justify: {
        type: String,
        default: 'justify-start'
    },
    height:{
        type: String,
        default: 'h-full'
    },
    title: {
        type: String
    },
    is_history_page:{
        type: Boolean,
        required: false
    }
})
</script>
<template>
<main class="flex flex-wrap gap-7 p-3">
    <h2 class="ml-6 text-white text-xl w-full" v-if="!is_history_page">{{ props.title }}</h2>
    <div :class="`flex  ${props.justify} ${props.width} ${props.height} flex-wrap gap-10`"><slot ></slot></div>   
</main>
</template>