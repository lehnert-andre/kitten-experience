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

  let LOGGER;

  export default {
    components: {
      AppBar,
      NavigationDrawer
    },
    data() {
      return {}
    },
    computed: {
      isProduction() {
        return this.$store.getters['isProduction'];
      }
    },
    mounted() {
      if (this.isProduction) {
        // deactivate the logging on PROD
        this.$LOGGER.disableLogging();
      }

      LOGGER = this.$LOGGER.getLogger(this);
      LOGGER.info('Application started.');
    }
  }
</script>
