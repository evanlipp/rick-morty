<template>
  <input :value="modelValue" @input="updateInput" />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
