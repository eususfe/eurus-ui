import type { PropType } from 'vue';
import { onBeforeUnmount, onMounted, ref, provide, defineComponent } from 'vue';
import type { Item } from './interface';
import MenuList from './meunList';
import { getPrefixCls, MenuFlatChangeKeys, MenuFlatKeys, MenuPropsKeys, MenuSelectedKeys } from '@/packages/_utils';
import './style.scss';

export const EMenuProps = {
  mode: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  items: {
    type: Array as PropType<Array<Item>>,
    default: () => [],
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  openkeys: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  selectedKey: {
    type: String,
    default: '',
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
};

export default defineComponent({
  name: 'EMenu',
  props: EMenuProps,
  emits: ['update:openkeys', 'update:selectedKey', 'click', 'select'],
  setup(props, { emit }) {

    const prefixCls = getPrefixCls('menu');

    provide(MenuPropsKeys, props);

    const flatList = ref<string[]>([]);

    provide(MenuFlatKeys, flatList);
    provide(MenuFlatChangeKeys, (key: string, add: boolean) => {
      if (add) {
        flatList.value.push(key);
      } else {
        const index = flatList.value.indexOf(key);
        flatList.value.splice(index, 1);
      }
      emit('update:openkeys', flatList.value);
    });

    const selectKey = ref(props.selectedKey);

    provide(MenuSelectedKeys, selectKey);
    provide(MenuFlatChangeKeys, (val: string) => {
      selectKey.value = val;
      emit('update:selectedKey', val);
    });

		  // 收起全部
    const slideUp = () => {
      flatList.value = [];
      selectKey.value = '';
    };
    const handleClick = (item: Item) => {
      emit('click', item);
    };
    const handleSelect = (item: Item) => {
      emit('select', item);
    };
    onMounted(() => {
      if (props.trigger === 'click' && props.mode === 'horizontal') {
        document.addEventListener('click', slideUp, false);
      }
    });
    onBeforeUnmount(() => {
      if (props.trigger === 'click' && props.mode === 'horizontal') {
        document.removeEventListener('click', slideUp, false);
      }
    });

    return () => (
			<div class={{
			  [prefixCls]: true,
			  [`${prefixCls}-${props.mode}`]: true,
			  [`${prefixCls}-${props.theme}`]: true,
			  [`${prefixCls}-collapsed`]: props.collapsed && props.mode === 'vertical',
			}}>
  <MenuList items={props.items} onClick={handleClick} onSelect={handleSelect}></MenuList>
			</div>

    );
  },
});
