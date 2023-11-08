import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import viewprogress from '@/components/viewprogress'
import createquestions from '@/components/createquestions' 
import viewschedule from '@/components/viewschedule' 

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
      path: '/home', 
      name: 'Home',
      component: Home,
    },
    {
      path: '/menu', 
      name: "Menu",
      component: Menu,
    },
    {
      path: '/view-progress', 
      name: "ViewProgress",
      component: viewprogress,
    },
    {
      path: '/view-schedule', 
      name: "ViewSchedule",
      component: viewschedule,
    },
    {
      path: '/create-questions', 
      name: "createquestions",
      component: createquestions,
    },
  ]
})