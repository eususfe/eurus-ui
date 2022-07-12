import type { PropType } from 'vue';
import { defineComponent, toRefs } from 'vue';
import classNames from '@/composables/useClassName';
import './style.scss';

const LoaderProps = {
  show: {
    type: Boolean as PropType<true>,
    default: false
  },
  loaddingText: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<string>,
    default: 'md'
  },
  color: {
    type: String as PropType<string>,
    default: '#A6A6A6'
  }
};

export default defineComponent({
  name: 'ELoading',
  props: LoaderProps,
  setup (props) {
    const { show, loaddingText, size, color } = toRefs(props);

    const sizeStyle = () => {
      switch (size.value) {
        case 'xs':
          return {
            height: '16px',
            width: '16px'
          };
        case 'sm':
          return {
            height: '18px',
            width: '18px'
          };
        case 'md':
          return {
            height: '36px',
            width: '36px'
          };
        case 'lg':
          return {
            height: '64px',
            width: '64px'
          };
        default:
          return {
            height: '36px',
            width: '36px'
          };
      }
    };

    const spanClass = () => {
      return classNames(['loadding-text', `${size.value}-text`]);
    };

    const loaddingStyle: any = {
      ...sizeStyle(),
      borderTopColor: color.value,
    };

    return () => (
      show && <span class="loadding">
        <div style={{ ...loaddingStyle }} />
        <span class={spanClass()}>{loaddingText.value}</span>
      </span>
    );
  }
});
