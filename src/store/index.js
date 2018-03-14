import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://odis.homeaway.com/odis/destination/2b4108ba-cbdb-4505-8950-57b997042ef9.hw1.jpg',
        id: '1',
        title: 'Android - This week in Los Angeles',
        date: '2018-03-15',
        location: 'Los Angeles',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://www.barfadeiasi.ro/wp-content/uploads/2017/11/londra-t.jpg',
        id: '2',
        title: 'Machine Learning - This week in London',
        date: '2018-03-16',
        location: 'London',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'https://www.gezitta.com/wp-content/uploads/2018/01/Berlin-ku%C5%9Fbak%C4%B1%C5%9F%C4%B1-manzaras%C4%B1.jpg',
        id: '3',
        title: 'iOS - This week in Berlin',
        date: '2018-03-16',
        location: 'Berlin',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'https://www.deccanjobs.com/wp-content/uploads/2017/03/Bangalore-City.jpg',
        id: '4',
        title: 'Node.js - This week in Bangalore',
        date: '2018-03-26',
        location: 'Bangalore',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://theflightfinder.com/wp-content/uploads/2017/12/paris.jpg',
        id: '5',
        title: 'Go lang - Next week in Paris',
        date: '2018-03-24',
        location: 'Paris',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://assets.nydailynews.com/polopoly_fs/1.3004701.1490126108!/img/httpImage/image.jpg_gen/derivatives/landscape_1200/473804254.jpg',
        id: '6',
        title: 'Data Science - Next week in New York',
        date: '2018-03-24',
        location: 'New York',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
      {
        imageUrl: 'http://ecowallpapers.net/wp-content/uploads/3912_sidney.jpg',
        id: '7',
        title: 'Big Data - This week in Sidney',
        date: '2018-03-17',
        location: 'Sidney',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.',
      },
    ],
    user: {
      id: '132',
      registeredMeetups: ['1'],
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        id: payload.id,
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
      };
      commit('createMeetup', meetup);
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
    }
  }
})