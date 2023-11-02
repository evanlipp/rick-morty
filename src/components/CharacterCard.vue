<template>
  <div class="character">
    <img :src="character.image" alt="character avatar" />
    <p>{{ character.id }}</p>
    <p>{{ character.name }}</p>
    <p>{{ character.species }}</p>
    <EpisodeLink
      v-for="episode in episodes"
      :key="episode.id"
      :episode="episode"
    />
  </div>
</template>

<script setup>
import EpisodeLink from "@/components/EpisodeLink.vue";
import { defineProps, ref } from "vue";
import axios from "axios";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const episodes = ref([]);

const episodesLinks = ref(props.character.episode);

const episodesNumbers = episodesLinks.value.slice(0, 5).map((url) => {
  const splittedUrl = url.split("/");
  return Number(splittedUrl[splittedUrl.length - 1]);
});

const fetchEpisodes = async () => {
  const response = await axios(
    `https://rickandmortyapi.com/api/episode/${episodesNumbers}`
  );
  if (!Array.isArray(response.data)) {
    episodes.value = [response.data];
  } else {
    episodes.value = response.data;
  }
};

fetchEpisodes();
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
