<template>
  <div class="character">
    <img :src="character.image" alt="character avatar" />
    <p>{{ character.id }}</p>
    <p @click="$router.push(`/character${character.id}`)">
      {{ character.name }}
    </p>
    <p>{{ character.species }}</p>
    <p
      @click="$router.push(`/episode${episode.data.id}`)"
      v-for="episode in episodes"
      :key="episode.data.id"
    >
      {{ episode.data.name }}
    </p>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const episodes = ref([]);

const episodesLinks = ref(props.character.episode.slice(0, 5));

const requests = episodesLinks.value.map((episode) => axios(episode));

Promise.all(requests)
  .then((response) => {
    episodes.value = response;
  })
  .catch(() => alert("something went wrong"));
</script>

<style lang="scss" scoped>
.character {
  max-height: 100px;
  width: 100%;
  margin: 5px;
  display: flex;
  gap: 20px;
  border: 1px solid black;
}
</style>
