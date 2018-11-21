import Vue from 'vue'
import Router from 'vue-router'
import Ebook from 'components/eBook'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/eBook'
    },
    {
      path: '/eBook',
      name: 'eBook',
      component: Ebook
    }
  ]
})
