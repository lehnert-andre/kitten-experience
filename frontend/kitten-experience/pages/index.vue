<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >

      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower
             developers to create amazing applications.</p>

          <img :src="getKitten.imageUrl" @click="removeFirst"/>

        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import KittenService from "../business-logic/kitten/kitten.service";
  import {Kitten} from "../business-logic/kitten/types/kitten.class";

  let LOGGER;
  let kittenService;
  export default {
    async mounted() {
      LOGGER = this.$LOGGER.getLogger(this);

      kittenService = new KittenService(this);

      LOGGER.info('Loaded')

      await kittenService.nextKitten();
    },
    computed: {
      getKitten() {
        const queue = this.$store.getters['KITTEN/getFirstIncomingKitten'];

        return queue ? queue : Kitten.unratedKitten(0, '');
      }
    },
    methods: {
      removeFirst() {
        this.$store.dispatch('KITTEN/REMOVE_FIRST_KITTEN_FROM_INCOMING_QUEUE');
      }
    }
  }
</script>
