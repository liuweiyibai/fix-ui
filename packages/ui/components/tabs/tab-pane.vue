<!-- <template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, reactive, ref, useSlots } from 'vue';
import { TabPaneProps, tabsRootContextKey } from './key';

defineOptions({ name: 'FixTabPane' });
const props = defineProps<TabPaneProps>();
const slots = useSlots();
const instance = getCurrentInstance()!;
const tabsRoot = inject(tabsRootContextKey);
if (!tabsRoot) throwError(COMPONENT_NAME, 'usage: <el-tabs><el-tab-pane /></el-tabs/>');

const index = ref<string>();
const paneKey = computed(() => props.key ?? index.value);
const active = computed(() => tabsRoot.currentName.value === (props.name ?? index.value));
const pane = reactive({
  uid: instance.uid,
  slots,
  props,
  paneKey,
  active,
  index,
  isClosable,
});
// export default {
//   name: '',

//   props: {
//     name: {
//       type: String,
//     },
//     label: {
//       type: String,
//       default: '',
//     },
//   },
//   data() {
//     return {
//       show: true,
//     };
//   },
//   mounted() {
//     this.TabsInstance.initTabs(this);
//   },
//   watch: {
//     label() {
//       this.TabsInstance.initTabs();
//     },
//     name() {
//       this.TabsInstance.initTabs();
//     },
//   },
// };
</script> -->
