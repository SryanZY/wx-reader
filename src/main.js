import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import FastClick from 'fastclick'
import 'common/stylus/global.styl'

Vue.config.productionTip = false

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
