<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm12
      md12>
      <v-alert v-if="ready && showHint"
        text
        color="primary">
        <h3 class="headline">Dear kitten lover or hater,</h3>

        {{ showHint }}

        <v-row
          align="center"
          no-gutters>
          <v-col class="grow">
            you can use the buttons to rate the kitten.
          </v-col>
          <v-spacer />
          <v-col class="shrink">
            <v-btn
              color="primary"
              outlined
              @click="dismissHint()">
              Dismiss
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>


      <v-card raised>
        <kitten-image :imageUrl="getKitten.imageUrl" :loading="loading" />

        <v-card-actions>
          <v-btn raised
                 large
                 color="#038F79"
                 @click="hate()">HATE
          </v-btn>
          <v-spacer/>
          <v-btn raised
                 large
                 color="primary"
                 @click="love()">LOVE
          </v-btn>

        </v-card-actions>
      </v-card>

    </v-flex>

  </v-layout>


</template>


<script>
  import KittenService from "../business-logic/kitten/kitten.service";
  import {Kitten} from "../business-logic/kitten/types/kitten.class";
  import KittenImage from '~/components/kitten/kitten-image';

  let LOGGER;
  let kittenService;
  export default {
    components: {
      KittenImage
    },
    async mounted() {
      LOGGER = this.$LOGGER.getLogger(this);

      kittenService = new KittenService(this);
      this.currentKitten = await kittenService.nextKitten();
      await kittenService.loadHint();

      LOGGER.info('Loaded');
      this.loading = false;
    },
    data() {
      return {
        currentKitten: null,
        loading: true,
      }
    },
    computed: {
      ready() {
        return !!this.currentKitten;
      },
      getKitten() {
        return this.currentKitten ? this.currentKitten : Kitten.unratedKitten(0, '');
      },
      getAppState() {
        return this.$store.getters['getAppState'];
      },
      showHint() {
        return this.ready ? this.$store.getters['showNotificationHint'] : false;
      }
    },
    methods: {

      async hate() {
        this.loading = true;
        await kittenService.hateKitten(this.currentKitten);
        this.currentKitten = await kittenService.nextKitten();
        this.loading = false;
      },
      async love() {
        this.loading = true;
        await kittenService.loveKitten(this.currentKitten);
        this.currentKitten = await kittenService.nextKitten();
        this.loading = false;
      },
      async dismissHint() {
        await kittenService.dismissHint();
      }
    }
  }
</script>
