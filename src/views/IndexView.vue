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
          v-model="store.searchByNameParam"
          @update:model-value="setSearchParam"
          placeholder="find character"
        />
        <p>filter by status</p>
        <MySelect
          v-model="store.selectedSortParam"
          :options="sortParams"
          @update:model-value="setSelectParam"
        />
      </div>
    </div>
    <div class="cards-list" v-if="store.charactersCount > 0">
      <CharacterCard
        v-for="character in store.characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <p v-else>{{ store.isCharactersLoading }}</p>
    <p v-if="store.errorMessage">{{ store.errorMessage }}</p>
    <div
      v-show="store.charactersCount > 19"
      class="scroll-observer"
      ref="scrollObserver"
    ></div>
  </div>
</template>

<script setup>
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";
import CharacterCard from "@/components/CharacterCard.vue";
import { onMounted, ref } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const scrollObserver = ref(null);
const sortParams = ref([
  { value: "alive", name: "alive" },
  { value: "dead", name: "dead" },
  { value: "unknown", name: "unknown" },
]);

const setSearchParam = (value) => {
  store.setName(value);
  store.fetchFilteredCharacters();
};

const setSelectParam = (value) => {
  store.setSelect(value);
  store.fetchFilteredCharacters();
};

store.fetchCharacters();

onMounted(() => {
  const options = {
    rootMargin: "0px",
    threshold: 1.0,
  };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      store.fetchCharacters();
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
