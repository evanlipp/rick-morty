<template>
  <div class="character">
    <img :src="character.image" alt="character avatar" />
    <p>{{ character.name }}</p>
    <p>{{ character.species }}</p>
    <EpisodeLink
      v-for="(episode, index) in character.episode.slice(0, 5)"
      :key="index"
      :episodeUrl="episode"
    />
  </div>
</template>

<script setup>
import EpisodeLink from "@/components/EpisodeLink.vue";
import { defineProps, ref } from "vue";

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.character {
  width: 100%;
  margin: 5px;
  display: flex;
  gap: 20px;
  border: 1px solid black;
}
</style>
