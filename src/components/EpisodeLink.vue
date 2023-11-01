<template>
  <div>{{ episode.name }}</div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import axios from "axios";

const props = defineProps({
  episodeUrl: {
    type: String,
    required: true,
  },
});

const episode = ref({});

const fetchEpisode = async () => {
  const response = await axios.get(props.episodeUrl);
  episode.value = response.data;
};

onMounted(() => {
  fetchEpisode();
});
</script>
