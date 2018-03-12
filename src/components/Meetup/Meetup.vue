<template>
<v-container>
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
                <span class="headline">{{ meetup.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="gray--text">{{ meetup.date }}</span><br>
            <span class="headline mb-0 ">{{ meetup.title }}</span><br>
            <span class="custom-style">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatum excepturi praesentium, consequatur repudiandae voluptatibus suscipit atque consectetur distinctio, hic natus laborum ipsum. Fugiat architecto blanditiis, perferendis deserunt delectus harum.</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="orange" dark>
            <v-icon left>person_add</v-icon>
            Reginster
          </v-btn>
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
      }
    }
  }
</script>

<style scoped>
.custom-style {
  font-size: 1.2em;
}
</style>
