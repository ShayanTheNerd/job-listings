import '@/styles/styles.css';
import App from '@/App.vue';
import autoAnimate from '@formkit/auto-animate';

const vAnimate = (element, { value: options }) => autoAnimate(element, { easing: 'linear', ...options });

createApp(App).use(createPinia()).directive('animate', vAnimate).mount('#app');
