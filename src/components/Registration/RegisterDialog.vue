<template>
  <v-dialog width="350px" persistent v-model="registerDialog">
    <v-btn  class="primary" slot="activator" round >
      <v-icon left v-if="!userIsRegistered">add</v-icon>
      <v-icon left v-else>clear</v-icon>
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card >
      <!-- header for dialog-->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>
            <h2 headline class="primary--text" v-if="userIsRegistered">Unregister from event?</h2>
            <h2 headline class="primary--text" v-else>Register to this event?</h2>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <!-- main content for dialog -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>You can always change you decision later on!</v-card-text>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <!-- footer for dialog -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-actions>
            <v-btn class="red--text darken-1" round flat @click="registerDialog = false" >Close</v-btn>
            <v-btn class="green--text darken-1" round flat @click="onAgree">Confirm</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false,
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.indexOf(this.meetupId.toString()) >= 0;
      },
    },
    methods: {
      onAgree() {
        if(this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId);
        } else {
          this.$store.dispatch('registerUserForMeetup', this.meetupId);
        }
        this.registerDialog = false;
      }
    }
  }
</script>