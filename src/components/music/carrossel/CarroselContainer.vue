<script setup>
import { CarrosselMidItem, CarroselItem, CarrosselShortItem } from '@/components';
import { onMounted, reactive, ref, watch } from 'vue';
import { useQueueStore , usePlayerStore} from '@/stores';

const playerStore = usePlayerStore()
const QueueStore = useQueueStore()
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const frames = reactive({
  frame_1: 0,
  frame_2: 1,
  frame_3: 2,
  frame_4: 3,
  frame_5: 4
})
const connect = ref(true)
const interval = ref(null)

const startLoop = () => {
    connect.value = true
    runLoop()
  
}

const stopLoop = () => {
  connect.value = false
  clearInterval(interval.value)
}


const runLoop = () => {
  if (props.data.includes(QueueStore.state.currentSong)) {
  connect.value = false
  clearInterval(interval.value)
    } else {
  if (connect.value) {
    frames.frame_1 = frames.frame_1 === 4 ? 0 : frames.frame_1 + 1;
      frames.frame_2 = frames.frame_2 === 4 ? 0 : frames.frame_2 + 1;
      frames.frame_3 = frames.frame_3 === 4 ? 0 : frames.frame_3 + 1;
      frames.frame_4 = frames.frame_4 === 4 ? 0 : frames.frame_4 + 1;
      frames.frame_5 = frames.frame_5 === 4 ? 0 : frames.frame_5 + 1;
 
  interval.value = setTimeout(runLoop, 3000)

}
}
}

onMounted(()=>{
  startLoop()
})

watch(
  () => QueueStore.state.currentSong, // Observa a propriedade
  (newVal, oldVal) => {
    if (newVal) {
      console.log('A música atual mudou:', newVal);
      startLoop(); // Para o loop se necessário
    } else {
      console.log('Sem música atual.');
      startLoop(); // Reinicia o loop se não houver música
    }
  }
);

</script>

<template>
  <section>
    <div class="h-[380px] items-center justify-center w-full flex">
      <CarroselItem :song="props.data[0]" :data="props.data[20]" :frame="`frame_${frames.frame_1}`" />
      <CarroselItem :song="props.data[1]" :data="props.data[21]" :frame="`frame_${frames.frame_2}`" />
      <CarroselItem :song="props.data[2]" :data="props.data[22]" :frame="`frame_${frames.frame_3}`" />
      <CarroselItem :song="props.data[3]" :data="props.data[23]" :frame="`frame_${frames.frame_4}`" />
      <CarroselItem :song="props.data[4]" :data="props.data[4]" :frame="`frame_${frames.frame_5}`" />

    </div>
  </section>
</template>
