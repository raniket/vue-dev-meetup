<template>
<v-container>
  <h3>This is for experiment purpose.</h3>
  <v-card>
    <v-card-media src="@/assets/logo.png" height="200px">
    <h3>Chart Will go here</h3>
    <div id="chart"></div>
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Telling story with visualition.</h3>
        <div>The description of visualition will go here...</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Pie Chart</v-btn>
      <v-btn flat color="orange">Bar Chart</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  data(){
    return {
    }
  }
}
</script>

<style scoped>

</style>

