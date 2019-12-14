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

  <!-- TODO reponsive image solution -->
  <!--        <v-img max-width="680" max-height="680" min-width="170" min-height="170" eager contain-->
  <!--               :srcset="`${getAdjustedKittenImage(320)} 320w,-->
  <!--                         ${getAdjustedKittenImage(500)} 500w,-->
  <!--                         ${getAdjustedKittenImage(680)} 680w`"-->
  <!--               sizes="(min-width: 1264px) 680px,-->
  <!--                      (min-width: 640px) 500px,-->
  <!--                      320px"-->
  <!--               :src="getAdjustedKittenImage(680)"-->
  <!--               class="grey lighten-2">-->
  <!--            <v-row v-if="loading"-->
  <!--              class="fill-height ma-0"-->
  <!--              align="center"-->
  <!--              justify="center"-->
  <!--            >-->
  <!--              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>-->
  <!--            </v-row>-->
  <!--        </v-img>-->

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
