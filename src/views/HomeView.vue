<script setup>
  import LunaIA from '@/components/layout/header/LunaIA.vue';
import router from '@/router';
import { artist } from '@/utils/artist-profile';

  function gopageartist(id){
    router.push(`/artist/${id}`)
  }
</script>
<template>
<div class="content">
  <header>
    <div class="logo">
      <h3>aqui tera a logo</h3>
    </div>
    <input type="text" class="search" placeholder="busque aqui as suas músicas">
    <RouterLink to="/login">entrar</RouterLink>
    <div class="user">
      <h3>aqui será o usuário</h3>
    </div>
  </header>
  <main>
    <section class="history">
      <h1>aqui será a aba de playlists recentes</h1>
    </section>
    <section class="main-section">
        <div v-for="info in artist" :key="index" class="card" @click="gopageartist(info.id)">
          <div class="img-container">
            <img :src="info.img">
          </div>
            <h1>{{ info.artist }}</h1>
        </div>
        <LunaIA />
    </section>
    <section>

    </section>
  </main>
</div>
</template>

<style scoped>
header{
  width: 96%;
  background-color: beige;
  margin-left: auto;
  margin-right: auto;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 100%;
  width: 15%;
  background-color: aqua;
}

.content {
  background-color: black;
}

.user {
  background-color: aqua;
  height: 100%;
  width: 18%;
}

.search {
  height: 5vh;
  width: 40%;
  border-radius: 50px;
  border: none;
  padding-left: 10px;
}

main {
  background-color: black;
  width: 100%;
  display: flex;
}

.history {
  height: 90vh;
  width: 20%;
  background-color: gray;
  margin: 1.7rem;
  border-radius: 10px;
}

.main-section {
  height: 90vh;
  width: 74%;
  margin-top: 1.7rem;
  margin-left: none;
  margin-bottom: 1.7rem;
  margin-right: 1.7;
  background-color: gray;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  gap: 20px ;
}
.img-container{
  padding: 20px;
}
.img-container img{
  width: 150px;
}
.card{
  display: flex;
  background-color: black;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 250px;
  transition: 1s;
  border-radius: 20px;
}
.card:hover{
  transform: scale(1.05);
}

</style>
