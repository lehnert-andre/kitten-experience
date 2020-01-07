<template>
  <v-img max-width="680" max-height="680" min-width="170" min-height="170" eager contain
         :src="imageUrl"
         class="grey lighten-2">

    <v-row v-if="loading"
           class="fill-height ma-0"
           align="center"
           justify="center"
    >
      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
    </v-row>

  </v-img>
</template>

<script>
  export default {
    props: {
      imageUrl: '',
      loading: true
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {

    }
  }
</script>
