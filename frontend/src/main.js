import Vue from 'vue'
import App from './App.vue'
import { store } from './store';
import errors from './errors.js'
import '@/assets/styles.css';

Vue.config.productionTip = false

errors(store);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
