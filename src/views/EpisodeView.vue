<template>
  <div class="wrapper">
    <div v-if="episode" class="episode">
      <h2>Episode name: {{ episode.name }}</h2>
      <p>premiere: {{ episode.air_date }}</p>
      <p>cast:</p>
      <div v-if="characters" class="characters">
        <div
          v-for="character in characters"
          :key="character.id"
          @click="$router.push(`/character${character.data.id}`)"
        >
          <img
            class="avatar"
            :src="character.data.image"
            alt="character avatar"
          />
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>
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

    const charactersRequests = charactersLinks.map((link) => axios(link));
    Promise.all(charactersRequests).then(
      (response) => (characters.value = response)
    );
  } catch {
    alert("something went wrong");
  }
};

fetchEpisode();
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 17% 0;
}
.episode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.characters {
  max-width: 1200px;
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
}
.avatar {
  border-radius: 50%;
  max-width: 50px;
  max-height: 50px;
  cursor: pointer;
}
</style>
