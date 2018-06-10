<template>
  <v-container>
    <!-- for buttons -->
    <v-layout raw wrap pd-5 mb-4>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn round class="text-center buttons" router to="/meetups" dark>Explore events</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn round class="text-center buttons" router to="/meetup/new" dark>Oraganize events</v-btn>
      </v-flex>
    </v-layout>

    <!-- for loader -->
    <v-layout row wrap class="text-xs-center" v-if="!isMeetupsLoaded">
      <v-flex xs12 sm6 offset-sm3>
        <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>

    <!-- for carousel -->
    <v-layout raw wrap v-if="isMeetupsLoaded && meetups.length > 0">
      <v-flex xs10 offset-xs1>
        <v-carousel xs8 sm8 style="cursor: pointer;">
          <v-carousel-item 
          v-for="meetup in meetups" 
          :src="meetup.imageUrl" 
          :key="meetup.id" 
          @click="onLoadMeetup(meetup.id)"
          style="text-decoration:none"
          :to="'/meetup/'+meetup.id" >
            <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!-- no meetups message -->
    <v-layout row wrap v-if="meetups.length === 0 && isMeetupsLoaded">
      <v-flex xs10 offset-xs1 class="text-xs-center">
        <h1>No events</h1>
      </v-flex>
    </v-layout>

    <!-- for message -->
    <v-layout raw wrap>
      <v-flex xs12 class="text-xs-center text-sm-center" mt-2 v-if="meetups.length !== 0">
        <h2 style="color: #FF8F00">Join our awesome developers community!</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    computed: {
      meetups: function() {
        return this.$store.getters.featuredMeetups;
      },
      isMeetupsLoaded () {
        return this.$store.getters.isMeetupsLoaded; // initial value: false
      }
    },
    methods: {
      onLoadMeetup: function(id) {  // go to specific event. NOT WORKING
        this.$router.push('/meetup/' + id);
      }
    },
  }
</script>

<style scoped>
.title {
  background-color: rgba(0,0,0,.5);
  padding: 15px;
  text-align: center;
  font-size: 2em;
  color: white;
}
</style>
