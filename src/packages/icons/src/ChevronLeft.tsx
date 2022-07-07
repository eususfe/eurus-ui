import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChevronLeft',
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em"
           viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z"></path>
      </svg>
    );
  },
});
