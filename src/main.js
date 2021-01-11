import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import {words, lists} from './db';

createApp(App).use(store).mount('#app');

store.dispatch('initialize');