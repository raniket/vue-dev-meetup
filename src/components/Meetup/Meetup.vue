<template>
<v-container v-if="meetup">
  <v-layout>
    <v-flex xs12 sm10 md10  offset-sm1 offset-md1>
      <v-card >
        <v-card-media
          class="white--text"
          height="400px"
          v-bind:src="meetup.imageUrl"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{ meetup.title }}</span><br>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="gray--text headline">Date: {{ meetup.date | date }}</span>
            <span v-if="!userIsCreator" class="mr-4"></span>
            <app-edit-meetup-date :meetup="meetup" v-if="userIsCreator" class="text-xs-left mr-4"></app-edit-meetup-date>

            <span class="gray--text headline" >Time: {{ meetup.date | time  }}</span>
            <app-edit-meetup-time :meetup="meetup" v-if="userIsCreator" ></app-edit-meetup-time><br>
            <span class="custom-style">{{ meetup.description }}</span>
          </div>
        </v-card-title>
        <v-card-actions v-if="userLogedIn">
            <app-edit-meetup :meetup="meetup" v-if="userIsCreator"></app-edit-meetup>
          <v-spacer></v-spacer>
          <app-register-dialog :meetupId="meetup.id" v-if="!userIsCreator"></app-register-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup: function() {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return (this.$store.getters.user.id !== null && this.$store.getters.user.id !== undefined);
      },
      userIsCreator () {
        if(!this.userIsAuthenticated) return false;
        return this.$store.getters.user.id === this.meetup.creatorId;
      },
      userLogedIn () {
        return this.$store.getters.user.id;
      },
    }
  }
</script>

<style scoped>
.custom-style {
  font-size: 1.2em;
}
</style>
