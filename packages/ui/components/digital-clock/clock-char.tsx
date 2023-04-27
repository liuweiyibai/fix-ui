import { PropType, computed, defineComponent, ref } from 'vue';
import classNames from 'classnames';

const FixClockChar = defineComponent({
  name: 'fix-clock-char',
  props: {
    char: String as PropType<string>,
  },
  setup(props) {
    const refWrapper = ref<HTMLDivElement | null>(null);
    const colon: boolean = props.char === ':';
    if (colon) {
      return () => <h1 className="fix-clock-char is-colon">:</h1>;
    }

    const count = computed<number>(() => parseInt(props.char!));

    const getCharSlider = (): JSX.Element => {
      const options: JSX.Element[] = [];

      for (let i = 0; i <= 9; i++) {
        const classes: string = classNames('fix-clock-char--slider-option', {
          active: count.value === i,
        });

        options.push(
          <span key={i} className={classes}>
            {i}
          </span>,
        );
      }

      const height: number = refWrapper.value ? refWrapper.value.offsetHeight : 0,
        top = `${count.value * height * -1}px`;

      return (
        <div className="fix-clock-char--slider" style={{ top }}>
          {options}
        </div>
      );
    };

    return () => (
      <div ref={refWrapper} className="fix-clock-char">
        {getCharSlider()}
      </div>
    );
  },
});

export default FixClockChar;
