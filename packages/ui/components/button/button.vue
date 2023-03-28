<template>
  <button class="fix-button" :class="buttonStyle"><slot /></button>
</template>

<script lang="ts" setup>
import './style/index.less';
import { computed } from 'vue';
defineOptions({ name: 'fix-button' });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`fix-button--${buttonProps.type}`]: buttonProps.type };
});
</script>
