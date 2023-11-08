import '@/styles.css';
import App from '@/App.vue';
import { createApp } from 'vue';
import useFetchJobs from '@/composables/useFetchJobs.mjs';

const jobs = await useFetchJobs();

createApp(App).provide('jobs', jobs).mount('#app');
