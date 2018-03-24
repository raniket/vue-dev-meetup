import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    anyMeetups : {},
    isMeetupsLoaded: false,
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
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

  actions: {
    loadMeetups({ commit }) {
      firebase.database().ref('meetups').on('value', function (snapshot) {
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
      commit('setLoading', true);
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id,
        status: 'active'
      };
      let key = null;
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const extension = filename.slice(filename.lastIndexOf('.'));
          commit('setLoading', false);
          return firebase.storage().ref('meetups/' + key + extension).put(payload.image);
        })
        .then(imageData => {
          const imageURL = imageData.downloadURL;
          return firebase.database().ref('meetups').child(key).update({ imageUrl: imageURL })
          
        })
        .catch(error => {
          commit('setLoading', false);
          console.log('error for meetup create: ', error);
        });
    },

    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updateMeetup = {};
      if (payload.title) updateMeetup.title = payload.title;
      if (payload.description) updateMeetup.description = payload.description;
      if (payload.time) updateMeetup.time = payload.time;
      firebase.database().ref('meetups').child(payload.id).update(updateMeetup)
        .then(data => {
          commit('setLoading', false);
          console.log('meetup updated');
        })
        .catch(error => {
          commit('setLoading', false);
          console.log('firebase error in updating the meetup');
        })
    },
  
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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