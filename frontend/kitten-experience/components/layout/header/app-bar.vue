<template>
    <v-app-bar
      :clipped-left="isNavigationDrawerClipped"
      fixed
      app
      height="60"
      color="rgb(252, 112, 134)">
      <v-app-bar-nav-icon @click.stop="showNavigationDrawer()"/>

      <v-toolbar-title style="width: 100%; text-align: center;">
          <span class="app-title">
            kitten experience
          </span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon disabled>

        <v-icon v-if="getAppState === 'OFFLINE'">mdi-flash-circle</v-icon>
        <v-icon v-else-if="getAppState === 'UPDATING'">mdi-sync</v-icon>

      </v-btn>


    </v-app-bar>
</template>

<style scoped>
  .app-title {
    font-family: 'Pacifico', cursive;
    font-size: 1.5rem;
  }
  .v-toolbar__title {
    line-height: 1.7;
  }
</style>

<script>
  import Kitten from '~/components/kitten/kitten';
  export default {
    components: {
      Kitten
    },
    data() {
      return {
        title: 'Vuetify.js'
      }
    },
    computed: {
      /**
       * @return true, if a clipped drawer should rests under the application toolbar
       */
      isNavigationDrawerClipped() {
        return this.$store.getters['NAVIGATION/isNavigationDrawerClipped']
      },
      getAppState() {
        return ''//this.$store.getters['navigation/getAppState']
      }
    },
    methods: {
      showNavigationDrawer() {
        this.$store.dispatch('NAVIGATION/SHOW_NAVIGATION_DRAWER');
      }
    }
  }
</script>
