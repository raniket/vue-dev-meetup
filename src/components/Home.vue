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

    <!-- for carousel -->
    <v-layout raw wrap >
      <v-flex xs10 offset-xs1>
        <v-carousel xs8 sm8 style="cursor: pointer;">
          <v-carousel-item 
          v-for="item in meetups" 
          :src="item.imageUrl" 
          :key="item.id" 
          @click="onLoadMeetup(item.id)" >
            <div class="title">{{ item.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <!-- for message -->
    <v-layout raw wrap>
      <v-flex xs12 class="text-xs-center text-sm-center" mt-2>
        <h2 style="color: #FF8F00">Join our awesome developers community!</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups: function() {
        return this.$store.getters.featuredMeetups
      }
    },
    methods: {
      onLoadMeetup: function(id) {
        // console.log('ON load Meetup');
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
