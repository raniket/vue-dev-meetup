<template>
  <v-app>
    <!-- navigation-drawer -->
    <v-navigation-drawer temporary v-model="sideNav" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" v-bind:to="item.link" :key="item.id">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar class="amber darken-3" dark app >
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title style="cursor: pointer">
        <router-link to="/" tag="span" style="cursor: pointer">Developers Community</router-link>
      </v-toolbar-title>
      
      <v-spacer>
      </v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems"  v-bind:to="item.link" :key="item.id">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

   <!-- content -->
   <v-content app>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>

  <!-- footer -->
  <v-footer app class="footer primary" dark >
    <v-layout>
      <v-flex xs12 sm12 align-center class="text-xs-center"><h3>&#169;2018 - Developers Community</h3></v-flex>
    </v-layout>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock', title: 'Sing in', link: '/signin'},
      ];
      if(this.$store.getters.user !== null && this.$store.getters.user) {
        menuItems = [
          {icon: 'view_list', title: 'View Events', link: '/meetups'},
          {icon: 'create', title: 'Create Events', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'},
          {icon: 'lock', title: 'Sign out', link: '/signout'}
          // {icon: 'extension', title: 'Experiments', link: '/experiment'},
        ];
      }
      return menuItems;
    }
  },
  name: "App"
};
</script>

<style scoped>

</style>
