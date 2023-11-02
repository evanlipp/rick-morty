<template>
  <input
    v-model="searchByNameQuery"
    @input="fetchFilteredCharacters"
    type="text"
    placeholder="find character"
  />
  <MySelect
    v-model="selectedSortParam"
    :options="sortParams"
    @update:model-value="fetchFilteredCharacters"
  />
  <div v-if="characters.length > 0" class="characters">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
  <div
    v-show="characters.length > 19"
    class="scroll-observer"
    ref="scrollObserver"
  ></div>
</template>

<script setup>
import MySelect from "@/components/UI/MySelect.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const characters = ref([]);
const scrollObserver = ref(null);
const searchByNameQuery = ref("");
const selectedSortParam = ref("");
const sortParams = ref([
  { value: "alive", name: "alive" },
  { value: "dead", name: "dead" },
  { value: "unknown", name: "unknown" },
]);

const url = ref("https://rickandmortyapi.com/api/character");

const fetchFilteredCharacters = async () => {
  try {
    url.value = `https://rickandmortyapi.com/api/character?name=${searchByNameQuery.value}&status=${selectedSortParam.value}`;
    const response = await axios(url.value);
    url.value = response.data.info.next;
    characters.value = response.data.results;
  } catch {
    characters.value = [];
  }
};

const fetchCharacters = async () => {
  try {
    if (!url.value) return;
    const response = await axios(url.value);
    url.value = response.data.info.next;
    characters.value = [...characters.value, ...response.data.results];
  } catch {
    return;
  }
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
