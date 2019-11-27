<template>
  <v-app>
    <!-- navigation to select the routes/ pages -->
    <navigation-drawer></navigation-drawer>

    <app-bar></app-bar>

    <!-- content area -->
    <!-- the router changes the displayed pages -->
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  import AppBar from '~/components/layout/header/app-bar';
  import NavigationDrawer from '~/components/layout/navigation/navigation-drawer';

  export default {
    components: {
      AppBar,
      NavigationDrawer
    },
    data() {
      return {}
    }
  }
</script>
