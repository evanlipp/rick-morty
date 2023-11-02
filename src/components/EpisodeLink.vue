<template>
  <div>{{ episode.name }}</div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  episode: {
    type: Object,
    required: true,
  },
});
</script>
