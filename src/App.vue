<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <MapGrid
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MapGrid from './components/MapGrid.vue';

export default Vue.extend({
  name: 'app',

  components: {
    MapGrid,
  },
});
</script>

<style lang="sass">
#app, #app *
  box-sizing: border-box

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
