import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'

import CreateMeetups from '@/components/Meetup/CreateMeetups.vue'
import Meetups from '@/components/Meetup/Meetups.vue'
import Meetup from '@/components/Meetup/Meetup'

import Profile from '@/components/User/Profile.vue'
import Signup from '@/components/User/Signup.vue'
import Signin from '@/components/User/Signin.vue'
import Signout from '@/components/User/Signout.vue'
import Experiment from '@/components/experiment/Experiment.vue'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
      beforeEnter: AuthGuard,
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetups',
      component: CreateMeetups,
      beforeEnter: AuthGuard,
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup,
      beforeEnter: AuthGuard,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/experiment',
      name: 'Experiment',
      component: Experiment,
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout,
      beforeEnter: AuthGuard
    }
    
  ]
})
