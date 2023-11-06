<template>
  <div class="wrapper">
    <div class="header">
      <h1>
        Multiverse <br />
        characters <br />
        database
      </h1>
      <div class="sort-form">
        <p>filter by name</p>
        <MyInput
          v-model="searchByNameQuery"
          @input="fetchFilteredCharacters"
          placeholder="find character"
        />
        <p>filter by status</p>
        <MySelect
          v-model="selectedSortParam"
          :options="sortParams"
          @update:model-value="fetchFilteredCharacters"
        />
      </div>
    </div>
    <div class="cards-list" v-if="characters.length > 0">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <p v-else>{{ isCharactersLoading }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div
      v-show="characters.length > 19"
      class="scroll-observer"
      ref="scrollObserver"
    ></div>
  </div>
</template>

<script setup>
import MyInput from "@/components/UI/MyInput.vue";
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
const errorMessage = ref("");
const isCharactersLoading = ref("");

const url = ref("https://rickandmortyapi.com/api/character");

const fetchFilteredCharacters = async () => {
  try {
    isCharactersLoading.value = "Loading...";
    url.value = `https://rickandmortyapi.com/api/character?name=${searchByNameQuery.value}&status=${selectedSortParam.value}`;
    const response = await axios(url.value);
    url.value = response.data.info.next;
    characters.value = response.data.results;
    errorMessage.value = "";
  } catch {
    characters.value = [];
    errorMessage.value = "There is no such characters";
  } finally {
    isCharactersLoading.value = "";
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

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}

.sort-form {
  height: 200px;
  width: 49%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cards-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
}
</style>
