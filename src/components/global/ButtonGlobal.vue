<template>
    <button id="btn_id" :style="{background: background, width: width, height: height, color:color, fontSize: font_size, border:border, borderRadius: border_radius}"><p v-if="!is_arrow">{{title}}</p><img src="../../assets/images/EmailSend.png" id="sendsvg" v-else></button>
</template>
<script setup>
    defineProps({
        title:{
            type: String,
            required: true
        },
        background:{
            type: String,
            required: true
        },
        width:{
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        },
        font_size:{
            type: String,
            required: true,
        },
        border_radius: {
            type: String,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        border:{
            type: String,
            required: true
        },
        is_arrow:{
            type: Boolean,
            required: true
        }
    })
</script>