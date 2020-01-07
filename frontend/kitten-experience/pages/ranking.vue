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

          <v-card-title class="headline">Die Top 5 Kätzchen</v-card-title>

          <v-list>
            <v-list-item
              v-for="kitten in ranking"
              :key="kitten.kittenId">


              <v-list-item-avatar height="5rem" width="5rem">
                <v-img :src="kitten.kittenUrl"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                Aktuelles Rating: {{ kitten.rating }}
              </v-list-item-content>


            </v-list-item>
          </v-list>

        </v-card>

      </v-flex>
    </v-layout>
</template>


<script>

  export default {
    async fetch ({ store }) {
      await store.dispatch('KITTEN/REFRESH_RANKING');
    },
    computed: {
      ranking() {
        return this.$store.getters['KITTEN/getTop5'];
      }
    }
  }
</script>
