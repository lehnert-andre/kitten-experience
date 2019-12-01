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

      <v-btn v-if="getAppState === 'UPDATING'" icon disabled class="spin">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
      <v-btn v-else-if="getAppState === 'OFFLINE'" icon disabled>
        <v-icon>mdi-flash-circle</v-icon>
      </v-btn>
      <v-btn v-else icon disabled>
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


<style>
  @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(-360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }

  .spin {
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
  }
</style>

<script>
  export default {
    data() {
      return {
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
        return this.$store.getters['getAppState'];
      }
    },
    methods: {
      showNavigationDrawer() {
        this.$store.dispatch('NAVIGATION/SHOW_NAVIGATION_DRAWER');
      }
    }
  }
</script>
