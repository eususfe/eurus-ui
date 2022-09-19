import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'HeaderSlot',
  props: {
    data: Object,
    index: Number
  },
  setup(props) {
    return () => {
      return props.data?.slots && props.data?.slots?.header ? h(
        'span',
        {},
        props.data.slots.header({
          column: props.data,
          index: props.index
        })
      ) : [];
    };
  }
});
