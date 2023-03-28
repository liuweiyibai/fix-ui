<template>
  <div class="fix-table">2222</div>
</template>
<script lang="ts" setup>
import './style/index.less';
import { computed } from 'vue';
defineOptions({ name: 'fix-table' });
type ButtonProps = {
  type?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`fix-table--${buttonProps.type}`]: buttonProps.type };
});
</script>
