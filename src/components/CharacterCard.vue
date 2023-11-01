<template>
  <div class="character">
    <p>{{ character.name }}</p>
    <p>{{ character.species }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

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
