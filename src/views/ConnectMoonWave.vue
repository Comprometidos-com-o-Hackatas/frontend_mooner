<script setup>
import { useMoonStore, usePlayerStore } from "@/stores";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const moonStore = new useMoonStore();
const playerStore = new usePlayerStore();
const route = useRoute();
const router = useRouter();
const showPermission = ref(true)

const moon = route.params.email;

const acceptSession = async () => {
    await moonStore.connectMoonWave(moon);
    router.push('/')
}

const cancel = () => {
    showPermission.value = false
    router.push('/')
}

</script>

<template>
    <div>  
      <div
        v-if="showPermission"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black"
      >
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 class="text-lg font-bold mb-4">Entrar na Sessão</h2>
          <p class="mb-4">Você deseja entrar nesta sessão?</p>
          <div class="flex justify-end space-x-4">
            <button
              @click="acceptSession"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Aceitar
            </button>
            <button
              @click="cancel"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>