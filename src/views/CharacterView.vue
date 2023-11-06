<template>
  <div class="wrapper">
    <div class="profile" v-if="character">
      <img class="avatar" :src="character.image" alt="character avatar" />
      <div class="profile__info">
        <h2>name: {{ character.name }}</h2>
        <p>species: {{ character.species }}</p>
        <p>location: {{ character.location.name }}</p>
      </div>
    </div>
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

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 17% 0;
}
.profile {
  display: flex;
  align-items: center;
  gap: 40px;
}
.avatar {
  border-radius: 50%;
}
</style>
