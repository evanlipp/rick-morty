<template>
  <div class="character">
    <div class="character__header">
      <img class="avatar" :src="character.image" alt="character avatar" />
      <div class="character__info">
        <p class="link" @click="$router.push(`/character${character.id}`)">
          {{ character.name }}
        </p>
        <hr />
        <p>{{ character.species }}</p>
      </div>
    </div>
    <div class="character__episodes-list">
      <p>Episodes appearance:</p>
      <p
        v-for="episode in episodes"
        :key="episode.data.id"
        class="link"
        @click="$router.push(`/episode${episode.data.id}`)"
      >
        {{ episode.data.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

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
  width: 49%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 14px -2px rgba(34, 60, 80, 0.17);

  &__header {
    display: flex;
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  &__episodes-list {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}

.avatar {
  border-radius: 50%;
  max-width: 150px;
  max-height: 150px;
}
</style>
