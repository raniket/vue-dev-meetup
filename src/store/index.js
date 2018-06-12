import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import * as _ from 'lodash'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    anyMeetups : {},
    isMeetupsLoaded: false,
    user: {
      id: null,
      registeredMeetups: [],
    },
    userData: null,
    loading: false,
    error: {
      signInError: null,
      signUnError: null,
    },
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
    setUserData(state, payload) {
      state.userData = payload;
    },
    setRegisteredMeetups(state, payload) {
      state.user.registeredMeetups = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      if (payload.signInError) state.error['signInError'] = payload.signInError;
      if (payload.signUpError) state.error['signUpError'] = payload.signUpError;
    },
    clearError(state) {
      state.error = {
        signInError: null,
        signUpError: null,
      };
    },
  },

  actions: {
    // loadMeetups({ commit, getters }) { // realtime update not enabled
    //   console.log('----- user details: ', getters.user);
    //   firebase.database().ref('meetups').once('value')
    //     .then(data => {
    //       console.log('Started loading meetups');
    //       const meetups = [];
    //       const objs = data.val();
    //       for (let key in objs) {
    //         objs[key]['id'] = key;
    //         if (objs[key]['status'] === 'active')
    //           meetups.push(objs[key]);
    //       }
    //       console.log('----- App start Loaded Meetups: ', meetups);
    //       commit('setLoadedMeetups', meetups);
    //       console.log('MEETUP IS LOADED: DATA: ', meetups);
    //       commit('setIsMeeupsLoaded');
    //     })
    //     .catch(error => {
    //       console.log('state|action|loadMeetups|catch error:', error);
    //   })
    // },

    loadMeetups({ commit, getters }) { // realtime update enabled
      firebase.database().ref('meetups').on('value', function (snapshot) {
        const meetups = [];
        const objs = snapshot.val();
        for (let key in objs) {
          objs[key]['id'] = key;
          if (objs[key]['status'] === 'active')
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
          };
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', {signUpError: error});
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
          };
          commit('setUser', userData);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', {signInError: error});
          console.log('state|action|signUserIn|catch error: ', error);
        })
    },

    autoSignin({ commit }, payload) {
      console.log('')
      commit('setUser', {
        id: payload.id,
        registeredMeetups: [],
      });
    },

    loadUserData({ commit, getters }, payload) {
      const userId = payload.id;
      firebase.database().ref('users').child(userId).on('value', function (snapshot) {
        const userData = snapshot.val();
        if (userData === null) {
          commit('setRegisteredMeetups', [])
          return;
        }
        commit('setUserData', userData);
        let registeredMeetups = _.valuesIn(userData.registrations);
        commit('setRegisteredMeetups', registeredMeetups);
      })
    },

    signUserOut({ commit }, payolad) {
      firebase.auth().signOut()
        .then(data => {
          const userData = {
            id: null,
            registeredMeetups: []
          };
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
        })
        .catch(error => {
          console.log('state|actions|registerUserForMeetup|firebase|catch: ', error);
          commit('setLoading', false);
        });
    },

    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      const meetupFirebaseKey = _.findKey(getters.userData.registrations, (value) => value === payload);
      firebase.database().ref('/users/' + user.id + '/registrations/').child(meetupFirebaseKey).remove()
        .then(data => {
          commit('setLoading', false);
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
    userData (state) {
      return state.userData;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    }
  }
})