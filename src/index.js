import 'babel-polyfill'
import Vue from 'vue'
import { initStore } from './utils'
import App from './App.vue'

const app = new Vue({ render: h => h(App) })

import('./data')
  .then(data => {
    initStore(data)
    app.$mount('#app')
  })

