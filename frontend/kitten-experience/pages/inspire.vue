<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/kitten-experience/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>


<script>
  let LOGGER;

  export default {
    mounted() {
      LOGGER = this.$LOGGER.getLogger(this);
      LOGGER.info('Loaded')

    },
    methods: {
      hallo() {
        LOGGER.info('HALLO')
      }
    }
  }
</script>
