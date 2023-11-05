<template>
  <div v-if="character">
    <img :src="character.image" alt="character avatar" />
    <p>{{ character.name }}</p>
    <p>{{ character.species }}</p>
    <p>{{ character.location.name }}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const character = ref();

const fetchCharacter = async () => {
  try {
    const response = await axios(
      `https://rickandmortyapi.com/api/character/${route.params.id}`
    );
    character.value = response.data;
  } catch {
    alert("something went wrong");
  }
};
fetchCharacter();
</script>
