import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore(
  "store",
  () => {
    const characters = ref([]);
    const errorMessage = ref("");
    const isCharactersLoading = ref("");
    const searchByNameParam = ref("");
    const selectedSortParam = ref("");
    const url = ref("https://rickandmortyapi.com/api/character");

    const charactersCount = computed(() => {
      return characters.value.length;
    });

    const setName = (value) => {
      searchByNameParam.value = value;
    };

    const setSelect = (value) => {
      selectedSortParam.value = value;
    };

    const fetchMoreCharacters = async () => {
      try {
        if (!url.value) return;
        const response = await axios(url.value);
        url.value = response.data.info.next;
        characters.value = [...characters.value, ...response.data.results];
      } catch {
        return;
      }
    };

    const fetchCharacters = async () => {
      try {
        isCharactersLoading.value = "Loading...";
        url.value = `https://rickandmortyapi.com/api/character?name=${searchByNameParam.value}&status=${selectedSortParam.value}`;
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

    return {
      characters,
      charactersCount,
      errorMessage,
      isCharactersLoading,
      searchByNameParam,
      selectedSortParam,
      setName,
      setSelect,
      fetchMoreCharacters,
      fetchCharacters,
    };
  },
  { persist: true }
);
