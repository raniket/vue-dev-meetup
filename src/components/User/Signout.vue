<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs-12 class="text-xs-center">
        <h1>Loggin out...</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user;
      }
    },
    watch: {
      user (value) {
        if (value.id === null) this.$router.push('/')
      }
    },
    created () {
      this.$store.dispatch('signUserOut', {});
    }
  }
</script>
