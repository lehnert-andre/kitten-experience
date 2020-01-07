<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm12
      md12>


      <v-card raised style="width: 500px; height: 560px">
        <kitten-image :imageUrl="getKitten.kittenUrl" :loading="loading"/>

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
  import KittenImage from '~/components/kitten/kitten-image';

  export default {
    components: {
      KittenImage
    },
    async fetch ({ store }) {
      await store.dispatch('KITTEN/NEXT_KITTEN');
    },
    async mounted() {
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
        return this.$store.getters['KITTEN/getCurrentKitten'];
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

        await this.$store.dispatch('KITTEN/HATE_KITTEN');

        this.loading = false;
      },
      async love() {
        this.loading = true;

        await this.$store.dispatch('KITTEN/LOVE_KITTEN');

        this.loading = false;
      }
    }
  }
</script>
