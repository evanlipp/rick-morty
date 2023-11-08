<template>
  <select class="select" :value="modelValue" @change="changeOption">
    <option value="">clear</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup>
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

<style lang="scss" scoped>
.select {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 0px 0px 14px -2px rgba(34, 60, 80, 0.17);
}
</style>
