import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'

import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import TimeFilter from './filters/time'
import 'vuetify/dist/vuetify.min.css'

import Alert from './components/Shared/Alert.vue'
import EditMeetup from './components/Meetup/Edit/EditMeetup.vue'
import EditMeetupDate from './components/Meetup/Edit/EditMeetupDate.vue'
import EditMeetupTime from './components/Meetup/Edit/EditMeetupTime.vue'

// import * as myObjs from './myObjs';
// Object.defineProperty(Vue.prototype, '$myObjs', { value: myObjs });

Vue.filter('date', DateFilter)
Vue.filter('time', TimeFilter)

Vue.component('app-alert', Alert);
Vue.component('app-edit-meetup', EditMeetup);
Vue.component('app-edit-meetup-date', EditMeetupDate);
Vue.component('app-edit-meetup-time', EditMeetupTime);

Vue.use(Vuetify, { theme: {
  // primary: '#ee44aa',
  primary: '#FF8F00',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  buttons: '#FF8F00'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      // apiKey: process.env.API_KEY,
      // authDomain: process.env.AUTH_DOMAIN,
      // databaseURL: process.env.DATABASE_URL,
      // projectId: process.env.PROJECT_ID,
      // storageBucket: process.env.STORAGE_BUCKET,
      // messagingSenderId: process.env.MESSAGING_SENDER_ID
    });
    firebase.auth().onAuthStateChanged(user => {
      // console.log('firbase stored users: ', user);
      if (user) {
        const locallyStoredUser = {
          id: user.uid,
          registeredMeetups: []
        };
        this.$store.dispatch('autoSignin', locallyStoredUser);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
})
