import mitt from 'mitt';
import { onMounted, onUnmounted } from 'vue';

type Events = {
  RESUME_UPDATE: any;
  ANNOUNCEMENT_UPDATE: any;
};

export const emitter = mitt<Events>();
export function useMitt(event: keyof Events, callback: any) {
  onMounted(() => {
    emitter.on(event, callback);
  });
  onUnmounted(() => {
    emitter.off(event, callback);
  });
}
