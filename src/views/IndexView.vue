<template>
  <div class="characters">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
  <div class="scroll-observer" ref="scrollObserver"></div>
</template>

<script setup>
import CharacterCard from "@/components/CharacterCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const characters = ref([]);
const page = ref(0);
const scrollObserver = ref(null);

onMounted(() => {
  loadCharacters();

  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      loadCharacters();
    }
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(scrollObserver.value);
});

const loadCharacters = async () => {
  page.value += 1;
  const response = await axios(`https://rickandmortyapi.com/api/character`, {
    params: {
      page: page.value,
    },
  });
  characters.value = [...characters.value, ...response.data.results];
};
</script>

<style lang="scss">
.characters {
  display: flex;
  padding: 100px;
  flex-direction: column;
}
</style>
