<template>
<v-container>
    <!-- list of meetups -->
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" mb-2>
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
                  <div>{{ meetup.date }}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat v-bind:to="'/meetup/' + meetup.id" >
                  <v-icon left>remove_red_eye</v-icon>
                  View This Event
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
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