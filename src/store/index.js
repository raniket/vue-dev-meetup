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
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (state.user.registeredMeetups.indexOf(meetup => meetup === id) >= 0) return;
      state.user.registeredMeetups.push(payload.id);
      state.user.firebaseKey[id] = payload.firebaseKey;
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.firebaseKey, payload);
    }
  },

  actions: {
    loadMeetups({ commit }) { // realtime update enabled
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
          console.log('Error in create meetup: ', error);
        });
    },

    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updateMeetup = {};
      if (payload.title) updateMeetup.title = payload.title;
      if (payload.description) updateMeetup.description = payload.description;
      if (payload.date) updateMeetup.date = payload.date.toISOString();
      firebase.database().ref('meetups').child(payload.id).update(updateMeetup)
        .then(data => {
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log('Error in updating the meetup: ', error);
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
            firebaseKey: {},
          };
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log('state|action|signUserUp|catch error: ', error);
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
            firebaseKey: {},
          };
          commit('setUser', userData);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log('state|action|signUserIn|catch error: ', error);
        })
    },

    autoSignin({ commit }, payload) {
      console.log('')
      commit('setUser', {
        id: payload.id,
        registeredMeetups: payload.registeredMeetups,
        firebaseKey: {},
      });
    },

    signUserOut({ commit }, payolad) {
      firebase.auth().signOut()
        .then(data => {
          const userData = null;
          commit('setUser', userData);
        })
        .catch(error => {
          console.log('state|signUserOut|catch error: ', error);
        })
    },

    clearError({ commit }) {
      commit('clearError');  
    },

    registerUserForMeetup({commit, getters}, payload) {
      commit('setLoading', true);
      const user = getters.user;
      firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
        .then(data => {
          commit('setLoading', false);
          commit('registerUserForMeetup', { id: payload, firebaseKey: data.key });
        })
        .catch(error => {
          console.log('state|actions|registerUserForMeetup|firebase|catch: ', error);
          commit('setLoading', false);
        });
    },

    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      if (!user.firebaseKey) return;
      const firebaseKey = user.firebaseKey[payload];
      firebase.database().ref('/users/' + user.id + '/registrations/').child(firebaseKey).remove()
        .then(data => {
          commit('setLoading', false);
          commit('unregisterUserFromMeetup', payload);
        })
        .catch(error => {
          console.log('state|actions|unregisterUserFromMeetup|error: ', error);
          commit('setLoading', false);
        });
    },
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