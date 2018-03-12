import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store }  from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  // primary: '#ee44aa',
  primary: '#FF8F00',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  buttons: '#FF8F00',
  meetup_card_color: '#000BDC1',
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
