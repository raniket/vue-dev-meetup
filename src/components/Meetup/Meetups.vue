<template>
<v-container>
    <!-- list of meetups -->
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" mb-2 v-if="meetups.length > 0">
    <v-flex xs12 sm10  offset-sm1 md10 offset-md1>
      <v-card >
        <v-container fluid>
          <v-layout>
            <v-flex xs5 sm4 md3>
              <v-card-media v-bind:src="meetup.imageUrl" height="130px">
              </v-card-media>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title  primary-title>
                <div>
                  <h3 class="headline mb-0">{{ meetup.title }}</h3>
                  <div>{{ meetup.date | date}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat v-bind:to="'/meetup/' + meetup.id" >
                  <v-icon left>open_in_browser</v-icon>
                  View This Event
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

  <!-- no meetups message -->
  <v-layout row wrap v-if="meetups.length === 0" >
    <v-flex xs12 class="text-xs-center">
      <h1>No events to display</h1>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    computed: {
      meetups: function() {
        return this.$store.getters.loadedMeetups;
      }
    }
  }
</script>