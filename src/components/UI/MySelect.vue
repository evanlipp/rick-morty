<template>
  <select :value="modelValue" @change="changeOption">
    <option value=""></option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const changeOption = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
