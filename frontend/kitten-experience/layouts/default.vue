<template>
  <v-app  style="min-width: 210px;">
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
      },
      getAppInfo() {
        return this.$store.getters['getAppInfo'];
      }
    },
    created() {
      // configure logging and display configuration while development
      if (this.isProduction) {
        // deactivate the logging on PROD
        this.$LOGGER.disableLogging();
      } else {
        this.$LOGGER.printAppInfo(this.getAppInfo);
      }
    },
    mounted() {
      LOGGER = this.$LOGGER.getLogger(this);
    }
  }
</script>

