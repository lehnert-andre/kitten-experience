<template>
    <v-list>
      <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        :to="route.to"
        router
        exact>

        <!-- route icon -->
        <!-- always visible -->
        <v-list-item-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-action>

        <!-- route name -->
        <!-- a minified navigation drawer does not show the route name -->
        <v-list-item-content>
          <v-list-item-title v-text="route.title"/>
        </v-list-item-content>

      </v-list-item>
    </v-list>
</template>


<script>
 export default {
  data() {
   return {
   }
  },
   computed: {
    routes() {
      return this.$store.getters['navigation/getRoutes']
    }
   }
 }
</script>
