import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import Vue3TouchEvents, {
  type Vue3TouchEventsOptions,
} from "vue3-touch-events";


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Тёнмая тема: временно отключено */
// import './theme/variables.dark-mode.css';

import store from './store';

const darkMode = localStorage.getItem('darkMode') === 'true';
store.commit('toggleDarkMode', darkMode);

const app = createApp(App);

app.use(IonicVue, {
  mode: 'md',
});

app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
  disableClick: false
  // any other global options...
})
app.use(router);
app.use(store);
  
router.isReady().then(() => {
  app.mount('#app');
});