<template>
  <v-navigation-drawer
    v-model="isNavigationDrawerVisible"
    :mini-variant="isNavigationDrawerMinified"
    :expand-on-hover="false"
    :clipped="isNavigationDrawerClipped"
    fixed
    app>

    <route-list></route-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block
               depressed
               @click="toggleNavigationDrawerSize()">
          <v-icon>mdi-{{ `chevron-${isNavigationDrawerMinified ? 'right' : 'left'}` }}</v-icon>
          {{ isNavigationDrawerMinified ? '' : 'collapse' }}
        </v-btn>
      </div>
    </template>

  </v-navigation-drawer>
</template>


<script>
  import RouteList from './route-list';

  export default {
    components: {
      RouteList
    },
    computed: {
      isNavigationDrawerVisible: {
        get() {
          return this.$store.getters['NAVIGATION/isNavigationDrawerVisible']
        },
        set(show) {
          if (show) {
            this.$store.dispatch('NAVIGATION/SHOW_NAVIGATION_DRAWER');
          } else {
            this.$store.dispatch('NAVIGATION/HIDE_NAVIGATION_DRAWER');
          }
        }
      },
      /**
       * @return true, if a clipped drawer should rests under the application toolbar
       */
      isNavigationDrawerClipped() {
        return this.$store.getters['NAVIGATION/isNavigationDrawerClipped']
      },
      /**
       * @return true, if only the icons are visible
       */
      isNavigationDrawerMinified() {
        return this.$store.getters['NAVIGATION/isNavigationDrawerMinified']
      },
    },
    methods: {
      toggleNavigationDrawerSize() {

        if (this.isNavigationDrawerMinified) {
          this.$store.dispatch('NAVIGATION/EXPAND_NAVIGATION_DRAWER');
        } else {
          this.$store.dispatch('NAVIGATION/MINIFY_NAVIGATION_DRAWER');
        }
      }
    },
    data() {
      return {
        open: false,
        config: {
          clipped: true,
          expandOnHover: true,
          miniVariant: false,
        }
      }
    }
  }
</script>
