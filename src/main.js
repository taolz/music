import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import '@/assets/css/base.scss'
import { Toast, ActionSheet, Loading } from 'vant';
import 'vant/lib/index.css'

Vue.use(Toast);
Vue.use(ActionSheet);
Vue.use(Loading);

Vue.use(VueLazyload, {
  loading: require('@/assets/images/loading.svg')
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
