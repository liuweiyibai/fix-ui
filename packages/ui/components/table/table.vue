<template>
  <div class="fe-table"></div>
</template>
<script lang="ts" setup>
import './style/index.less';
import { computed } from 'vue';
defineOptions({ name: 'fe-button' });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`fe-button--${buttonProps.type}`]: buttonProps.type };
});
</script>
