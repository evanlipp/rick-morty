<template>
  <input class="input" :value="modelValue" @input="updateInput" />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.input {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 14px -2px rgba(34, 60, 80, 0.17);
}
</style>
