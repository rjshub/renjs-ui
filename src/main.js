// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  sync
} from 'vuex-router-sync'
sync(store, router)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
Vue.use(ElementUI)

import Util from '@/services/util'
Vue.use(Util)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return ( <
      App / >
    )
  }
})
