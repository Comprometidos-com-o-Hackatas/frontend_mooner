<script setup>
import { useLoginStore } from '@/stores/user/login';
import UserOptions from '../user/artist/UserOptions.vue';
const loginStore = useLoginStore()
</script>
<template>
    <div class="flex justify-end w-[97.5%] mb-3 mx-auto relative right-0 min-h-10 text-white items-end ">
        <div class="user-config ">
            <div class="flex items-center gap-2 px-2 pt-1 ">
                <img class="w-7 rounded-full" src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=WfNjlHz94xdl5g&pid=ImgRaw&r=0">
                <p :class="loginStore.user.premium ? 'btn-dourado' : 'text-white'" >{{loginStore.user.email}}</p>
            </div>
            <div  id="options">
                <UserOptions :is_artist="loginStore.user.is_artist" :logout="loginStore.Logout"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .user-config{
        position: absolute;
        right: 0;
        margin-right: 20px;
        transition: 0.4s;
        border-radius: 10px 10px 0px 0px ;
    }
    #options{
       
        transition: 0.6s;
        opacity: 0;
        width: 100%;
        position: absolute;
        height: 0px;
       
        
    }
    .user-config:hover{
        background-color: blueviolet;
    
    }
    .user-config:hover #options{

        opacity: 1;
        height: auto;
        margin-bottom: 20px;
       
        background-color: blueviolet;
        gap: 5px;
       
        border-radius: 0px 0px 10px 10px;
        right: 0.005px;
        font-size: 17px;
        padding: 10px;
        
    }
    .btn-dourado {
        width: auto;
        height: auto;
        margin: auto;
        border: none;
        border-radius: 40px;
        background: linear-gradient(to right,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000000;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        z-index: 2;
        transition-duration: 0.5s;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.144);
        background-size: 250% 200%;
        padding: 5px;
      }
</style>