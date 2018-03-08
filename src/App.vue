<template>
  <v-app>
    <!-- navigation-drawer -->
    <v-navigation-drawer temporary v-model="sideNav" app>
      <v-list>
        <v-list-tile v-for="item in menuItems" router v-bind:to="item.link">
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
    <v-toolbar class="amber darken-3" dark app>
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="curson: pointer">Meetup</router-link>
      </v-toolbar-title>
      
      <v-spacer>
      </v-spacer>

      <v-toolbar-item class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" router v-bind:to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
          <!-- <router-link v-bind:to="item.linkTo">{{ item.title }}</router-link> -->
        </v-btn>
      </v-toolbar-item>
    </v-toolbar>

   <!-- content -->
   <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>

  <!-- footer -->
  <v-footer app>
    <div id="footer">
      <p>@ feature preduction 2018</p>
    </div>
  </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
        {icon: 'room', title: 'Organize Meetups', link: '/meetup/new'},
        {icon: 'person', title: 'Profile', link: '/profile'},
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock', title: 'Sing in', link: '/signin'},
      ]
    };
  },
  name: "App"
};
</script>

<style scoped>
#footer p{
  text-align: center;
}
</style>
