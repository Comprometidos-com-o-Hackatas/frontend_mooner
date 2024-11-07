<script setup>
import ButtonGlobal from './ButtonGlobal.vue';
defineProps({
    msg: {
        type: String,
        required: true
    },
    err: {
        type: Boolean,
        required: true
    }
})
</script>
<template>
    <div class="msg-container">
        <div class="msg-card">
            <i :class="!err ? 'mdi mdi-check-circle' : 'mdi mdi-close-circle'"></i>
            <div>
                <p class="text-black" v-html="msg"></p>
                <ButtonGlobal width="100px" font_size="15px" border="none" border_radius="10px" background="black" color="white" title="ok" @click="$emit('confirm', err)"/>
            </div> 
        </div>
    </div>
</template>
<style>
    .msg-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 9999;
        position: fixed;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .msg-card{
        width: 350px;
        background-color: white;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }
        & div p{
            font-size: 17px;
            text-align: center;
        }
    }
    #btn-confirm{
        background-color: black;
        color: white;
        width: 75px;
        height: 30px;
        border: none;
        border-radius: 10px;
        font-size: 17.5px;
    }
    .mdi-check-circle{
        font-size: 40px;
        color: rgb(3, 201, 3);
    }
    .mdi-close-circle{
        font-size: 40px;
        color: rgb(201, 3, 3);
    }
</style>