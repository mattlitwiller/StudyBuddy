import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import viewprogress from '@/components/viewprogress'
import createquestions from '@/components/createquestions' 
import viewschedule from '@/components/viewschedule'
import ViewDecks from '../components/ViewDecks.vue';
import QuizPage from '@/components/QuizPage'


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
      path: '/quiz/:deck', // :deck is a dynamic segment that will be replaced by the actual deck name
      name: 'QuizPage',
      component: QuizPage,
      props: true, // This allows the deck parameter to be passed as a prop to the QuizPage component
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
      path: '/view-decks',
      name: 'ViewDecks',
      component: ViewDecks
    },
    {
      path: '/create-questions', 
      name: "createquestions",
      component: createquestions,
    },
    
  ]
})