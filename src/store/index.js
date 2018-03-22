import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: { // all application data lives here.
    loadedMeetups: [],
    anyMeetups : {},
    isMeetupsLoaded: false,
    user: null,
    loading: false,
    error: null,
  },
  mutations: { // modifies data in state object.
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload;
    },
    setAnyMeetups (state, payload) {
      state.anyMeetups = payload;
    },
    setIsMeeupsLoaded(state) {
      state.isMeetupsLoaded = true;
    },
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
    // loadMeetups({ commit }) { // realtime update not enabled
    //   firebase.database().ref('meetup').once('value')
    //     .then(data => {
    //       const meetups = [];
    //       const objs = data.val();
    //       for (let key in objs) {
    //         objs[key]['id'] = key;
    //         meetups.push(objs[key]);
    //       }
    //       commit('setLoadedMeetups', meetups);
    //       commit('setIsMeeupsLoaded');
    //     })
    //     .catch(error => {
    //       console.log(error);
    //   })
    // },
    loadMeetups({ commit }) { // realtime update enabled
      firebase.database().ref('meetup').on('value', function (snapshot) {
        const meetups = [];
        const objs = snapshot.val();
        for (let key in objs) {
          objs[key]['id'] = key;
          if(objs[key]['status'] === 'active')
            meetups.push(objs[key]);
        }
          commit('setLoadedMeetups', meetups);
          commit('setIsMeeupsLoaded');
      })
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id,
        status: 'active'
      };
      firebase.database().ref('meetup').push(meetup)
        .then(data => {})
        .catch(error => {
          console.log('error for meetup create: ', error);
        });
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
    autoSignin({ commit }, payload) {
      console.log('')
      commit('setUser', { id: payload.id, registeredMeetups: payload.registeredMeetups });
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
    isMeetupsLoaded (state) {
      return state.isMeetupsLoaded;
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