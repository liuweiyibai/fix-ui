<!-- <template>
  <div class="fix-tabs">
    <div ref="navWrap" class="fix-tabs-nav-wrap" :class="[scrollable ? 'tabs-nav-scrollable' : '']">
      <span class="fix-tabs-nav-prev" :class="[scrollable ? '' : 'fix-tabs-nav-scroll-disabled']" @click="scrollPrev">
        <svg-icon iconClass="arrow-right" style="transform: rotate(180deg)" />
      </span>
      <span class="fix-tabs-nav-next" :class="[scrollable ? '' : 'fix-tabs-nav-scroll-disabled']" @click="scrollNext">
        <svg-icon iconClass="arrow-right" />
      </span>
      <div ref="navScroll" class="fix-tabs-nav-scroll">
        <div ref="nav" class="fix-tabs-nav" :style="navStyle">
          <div class="fix-tabs-inv-bar" :style="barStyle"></div>

          <div
            class="fix-tabs-tab"
            v-for="(item, index) in navList"
            :class="{ 'tab-active': item.key === _activeKey }"
            :key="item.key"
            @click="handleChange(index)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="fix-tabs-content">
      <slot ref="slots"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CSSProperties, computed, ref } from 'vue';

const props = defineProps<{ activeKey: string }>();
const emit = defineEmits(['update:value']);

const scrollable = ref(false);
const barWidth = ref(0);
const barOffset = ref(0);
const navList = ref([]);
const navStyle = ref<CSSProperties>({
  transform: '',
});

const _activeKey = computed({
  get() {
    return props.activeKey;
  },
  set(key: string) {
    emit('update:value', key);
  },
});

const barStyle = computed<CSSProperties>(() => {
  return {
    width: `${barWidth.value}px`,
    transform: `translate3d(${barOffset.value}px,0px,0px) scaleX(0.5)`,
  };
});

function scrollPrev() {
  //
}

function scrollNext() {
  //
}

function handleChange(index: number) {
  //
}
</script> -->
