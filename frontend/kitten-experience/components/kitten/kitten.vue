<template>
  <span>
    {{ getFace }}
  </span>
</template>

<script>
  export default {
    props: {
      face: 'normal' | 'smile' | 'crying' | 'lovely'
    },
    data() {
      return {
      }
    },
    computed: {
      getFace() {
        switch (this.face) {
          case 'crying':  return '😿';
          case 'smile':  return '😺';
          case 'lovely':  return '😻';
          default: return '🐱';
        }
      }
    }
  }
</script>
