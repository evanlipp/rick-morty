<template>
  <input
    v-model="searchByNameQuery"
    @input="fetchFilteredCharacters"
    type="text"
    placeholder="find character"
  />
  <div class="characters">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
  <div
    v-show="characters.length > 0"
    class="scroll-observer"
    ref="scrollObserver"
  ></div>
</template>

<script setup>
import CharacterCard from "@/components/CharacterCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const characters = ref([]);
const page = ref(0);
const scrollObserver = ref(null);
const searchByNameQuery = ref("");

const url = ref("https://rickandmortyapi.com/api/character/");

const fetchFilteredCharacters = async () => {
  try {
    url.value = `https://rickandmortyapi.com/api/character?name=${searchByNameQuery.value}`;
    const response = await axios(url.value);
    characters.value = response.data.results;
  } catch {
    return;
  }
};

const fetchCharacters = async () => {
  if (!url.value) return;
  const response = await axios(url.value);
  url.value = response.data.info.next;
  characters.value = [...characters.value, ...response.data.results];
};

onMounted(() => {
  fetchCharacters();

  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      fetchCharacters();
    }
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(scrollObserver.value);
});
</script>

<style lang="scss">
.characters {
  display: flex;
  padding: 100px;
  flex-direction: column;
}
</style>
