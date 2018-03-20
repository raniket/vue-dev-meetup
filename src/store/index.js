import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: { // all application data lives here.
    loadedMeetups: [
      {
        imageUrl: 'https://odis.homeaway.com/odis/destination/2b4108ba-cbdb-4505-8950-57b997042ef9.hw1.jpg',
        id: '1',
        title: 'Android - This week in Los Angeles',
        date: new Date(),
        location: 'Los Angeles',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://www.barfadeiasi.ro/wp-content/uploads/2017/11/londra-t.jpg',
        id: '2',
        title: 'Machine Learning - This week in London',
        date: new Date(),
        location: 'London',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'https://www.gezitta.com/wp-content/uploads/2018/01/Berlin-ku%C5%9Fbak%C4%B1%C5%9F%C4%B1-manzaras%C4%B1.jpg',
        id: '3',
        title: 'iOS - This week in Berlin',
        date: new Date(),
        location: 'Berlin',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'https://www.deccanjobs.com/wp-content/uploads/2017/03/Bangalore-City.jpg',
        id: '4',
        title: 'Node.js - This week in Bangalore',
        date: new Date(),
        location: 'Bangalore',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://theflightfinder.com/wp-content/uploads/2017/12/paris.jpg',
        id: '5',
        title: 'Go lang - Next week in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://assets.nydailynews.com/polopoly_fs/1.3004701.1490126108!/img/httpImage/image.jpg_gen/derivatives/landscape_1200/473804254.jpg',
        id: '6',
        title: 'Data Science - Next week in New York',
        date: new Date(),
        location: 'New York',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://ecowallpapers.net/wp-content/uploads/3912_sidney.jpg',
        id: '7',
        title: 'Big Data - This week in Sidney',
        date: new Date(),
        location: 'Sidney',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: { // get data from actions and set data values in state.
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  // the section computes the data, communication from server and send data to mutation.
  actions: { // all data from components comes here for processign.
    createMeetup({commit}, payload) {
      const meetup = {
        id: payload.id,
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
      };
      commit('createMeetup', meetup);
    },
    signUserUp({ commit }, payload) { // creat a new user action
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password) // communication to firebase
        .then(data => {
          commit('setLoading', false);
          const newUser = {
            id: data.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log('SOME ERROR HAS OCCURED');
          console.log('error.code: ', error.code);
          console.log('error.message: ', error.message);
        })
    },
    signUserIn({ commit }, payolad) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payolad.email, payolad.password)
        .then(data => {
          commit('setLoading', false);
          const userData = {
            id: data.uid,
            registeredMeetups: [],
          };
          commit('setUser', userData);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log('SOME ERROR HAS OCCURED IN user signin process');
          console.log('error.code: ', error.code);
          console.log('error.message: ', error.message);
        })
    },
    signUserOut({ commit }, payolad) {
      firebase.auth().signOut()
        .then(data => {
          const userData = null;
          commit('setUser', userData);
        })
        .catch(error => {
          console.log('SOME ERROR HAS OCCURED IN user singout process');
          console.log('error.code: ', error.code);
          console.log('error.message: ', error.message);
        })
    },
    clearError({ commit }) {
      commit('clearError');  
    }
  },
  // portal to get the data form state.
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      })
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        })
      }
    },
    user (state) {
      return state.user;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    }
  }
})