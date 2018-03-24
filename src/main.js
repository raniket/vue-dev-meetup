import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'

import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import 'vuetify/dist/vuetify.min.css'

import Alert from './components/Shared/Alert.vue'
import EditMeetup from './components/Meetup/Edit/EditMeetup.vue'

Vue.filter('date', DateFilter)

Vue.component('app-alert', Alert);
Vue.component('app-edit-meetup', EditMeetup);

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
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDNfxxSpN0nMrRfNfrPNtkw5lVOLT01mXE",
      authDomain: "developers-community-380f0.firebaseapp.com",
      databaseURL: "https://developers-community-380f0.firebaseio.com",
      projectId: "developers-community-380f0",
      storageBucket: "gs://developers-community-380f0.appspot.com/",
      messagingSenderId: "1047521904901"

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
