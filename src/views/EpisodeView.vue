<template>
  <div v-if="episode">
    <p>{{ episode.name }}</p>
    <p>{{ episode.air_date }}</p>
    <p
      @click="$router.push(`/character${character.data.id}`)"
      v-for="character in characters"
      :key="character.id"
    >
      <img :src="character.data.image" alt="character avatar" />
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const episode = ref();
const characters = ref();

const fetchEpisode = async () => {
  try {
    const response = await axios(
      `https://rickandmortyapi.com/api/episode/${route.params.id}`
    );
    episode.value = response.data;
    const charactersLinks = response.data.characters;

    const requests = charactersLinks.map((link) => axios(link));
    Promise.all(requests).then((response) => (characters.value = response));
  } catch {
    alert("something went wrong");
  }
};

fetchEpisode();
</script>
