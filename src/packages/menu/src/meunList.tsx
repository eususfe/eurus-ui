import type { PropType } from 'vue';
import { Transition, inject, ref, defineComponent } from 'vue';
import type { Item } from './interface';
import { MenuFlatChangeKeys, MenuFlatKeys, MenuPropsKeys, MenuSelectedChangeKeys, MenuSelectedKeys } from '@/packages/_utils';
import ToolTip from '@/packages/tooltip';
const EMenuListProps = {
  items: {
    type: Array as PropType<Array<Item>>,
    default: () => [],
  },
  itemUl: {
    type: Object as PropType<Item>,
    default: () => { },
  },
  layer: {
    type: Number,
    default: 0,
  },
};

const MenuList = defineComponent({
  name: 'EMenuList',
  props: EMenuListProps,
  emit: ['click', 'select'],
  setup(props, { emit }) {

    // flat list
    const flatList = inject(MenuFlatKeys, ref<string[]>([]));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const flatChange = inject(MenuFlatChangeKeys, (key: string, add: boolean) => { });

    // selected key
    const selectedKey = inject(MenuSelectedKeys, ref<string>(''));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedChange = inject(MenuSelectedChangeKeys, (key: string) => { });

    const menuProps = inject(MenuPropsKeys, {
      mode: 'horizontal',
      items: [],
      trigger: 'click',
      openkeys: [],
      theme: 'light',
      selectedKey: '',
      collapsed: false
    });

    const pushOrSplice = (item: Item, add: boolean) => {
      if (item.disabled) {
        return;
      }
      if (add) {
        // 有子级时才处理
        if (item.children && !flatList.value.includes(item.key)) {
          flatChange && flatChange(item.key, add);
        }
      } else {
        flatChange && flatChange(item.key, add);
      }
    };

    const onMouseEvent = (item: Item, add: boolean) => {
      if (
        (menuProps.trigger === 'hover' && menuProps.mode === 'horizontal')
				|| (menuProps.mode === 'vertical' && menuProps.collapsed)
      ) {
        pushOrSplice(item, add);
      }
    };
    const mouseenter = (item: Item) => {
      if (item.children && item?.children.length > 0) {
        onMouseEvent(item, true);
      }
    };
    const mouseleave = (item: Item) => {
      if (item.children && item?.children.length > 0) {
        onMouseEvent(item, false);
      }
    };

    const click = (items: Item, evt: MouseEvent) => {
      if (items.disabled) {
        return;
      }
      if (menuProps.trigger === 'click' || menuProps.mode === 'vertical') {
        pushOrSplice(items, !flatList.value.includes(items.key));
      }
      // 如果没有子级，设置当前选中项
      if (!items.children) {
        selectedChange && selectedChange(items.key);
        emit('select', items);
      }
      emit('click', items);
      evt.stopPropagation();
    };

    const select = (items: Item) => {
      emit('select', items);
    };
    const clickEmit = (items: Item) => {
      emit('click', items);
    };
    // 高度展开动画
    const beforeEvent = (node: HTMLElement) => {
      const height = node.dataset.height;
      if (height) {
        node.style.height = height + 'px';
        node.style.overflow = 'hidden';
      }
    };
    const afterEvent = (node: HTMLElement) => {
      node.style.height = '';
      node.style.overflow = '';
    };

    return () => (
			<Transition name="menu"
				onBeforeEnter={() => beforeEvent}
				onAfterEnter={() => afterEvent}
				onBeforeLeave={() => beforeEvent}
				onAfterLeave={() => afterEvent}
			>

				{
					props.itemUl || flatList.value.includes( props.itemUl?.key) ? (
						<ul class={{ ['layer-' + props.layer]: true, 'is-child': props.itemUl }}>
							{props.items.map(item => (
								// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
								<li
									class={{
									  'is-active': item.key === selectedKey.value,
									  'is-disabled': item.disabled,
									  'is-open': flatList.value.includes(item.key),
									}}
									onKeydown={evt => click(item)}
									onMouseenter={() => mouseenter(item)}
									onMouseleave={() => mouseleave(item)}
									onClick={evt => click(item, evt)}
								>
									<div class="menu-items">
										<span class="menu-title">
											<ToolTip
												content={item.label}
												direction="right"
												x={15}
												disabled={!(props.layer === 0 && !item.children && menuProps.collapsed)}
											>
												<i class={`icon icon-${item.icon}`} v-if="items.icon"></i>
											</ToolTip>
											<span class="name">{item.label}</span>
											<i class="icon-arrow" v-if="items.children"></i>
										</span>
										{
											item.children && (
												<MenuList
													items={item.children}
													itemUl={item}
													layer={props.layer + 1}
													onSelect={select}
													onClick={clickEmit}
												/>
											)
										}
									</div>
								</li>
							))}
						</ul>
					) : ''
				}

			</Transition>
    );
  }
});

export default MenuList;
