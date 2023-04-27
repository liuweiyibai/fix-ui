import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import ClockChar from './clock-char';
import './style/index.less';

const DigitalClock = defineComponent({
  name: 'fix-digital-clock',
  setup() {
    const date = ref<Date>(new Date());
    const interval = ref<NodeJS.Timeout>();

    const formatSegment = (segment: number): string => {
      return segment < 10 ? `0${segment}` : `${segment}`;
    };

    const getHours = (hours: number): number => {
      return hours % 12 === 0 ? 12 : hours % 12;
    };

    const getTime = (): string => {
      const hours = getHours(date.value.getHours()),
        minutes = date.value.getMinutes(),
        seconds = date.value.getSeconds();
      return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
    };

    const getChars = (): JSX.Element[] => {
      return getTime()
        .split('')
        .map((char: string, index: number) => <ClockChar key={index} char={char} />);
    };

    onMounted(() => {
      interval.value = setInterval(() => {
        const update: Date = new Date();
        if (update.getSeconds() !== date.value.getSeconds()) {
          date.value = update;
        }
      }, 100);
    });

    onUnmounted(() => {
      clearInterval(interval.value);
    });
    return () => <div class="fix-digital-clock">{getChars()}</div>;
  },
});

export default DigitalClock;
