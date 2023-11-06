import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import ViewSchedule from '@/components/ViewSchedule'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: "Hello",
      component: Hello,
    },
    {
      path: '/home', // Change this to a unique path
      name: 'Home',
      component: Home,
    },
    {
      path: '/menu', // Change this to a unique path
      name: "Menu",
      component: Menu,
    },
    {
      path: '/view-schedule', // Path should be kebab-case
      name: 'ViewSchedule', // Name is typically PascalCase or camelCase
      component: ViewSchedule,
    },
    // Add other routes here as needed
  ]
})