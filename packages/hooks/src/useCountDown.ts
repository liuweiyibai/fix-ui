import { reactive, ref } from 'vue';

export function useCountDown() {
  // 计时器状态，
  const timerState = reactive({ running: false, countNum: 0 });

  const countInterval = ref<NodeJS.Timer | null>(null);

  const startCountDown = (num: number) => {
    timerState.countNum = Number(num);
    clearCountDown();
    timerState.running = true;
    countInterval.value = setInterval(() => {
      if (timerState.countNum === 0) {
        timerState.running = false;
        clearInterval(countInterval.value!);
        countInterval.value = null;
        return;
      }
      timerState.countNum--;
    }, 1000);
  };

  const clearCountDown = () => {
    if (countInterval.value) {
      clearInterval(countInterval.value);
    }
  };

  return { timerState, startCountDown, clearCountDown };
}
