<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <BinaryOptions msg="Binary Options"/>
  </div>
</template>

<script>
import BinaryOptions from './components/BinaryOptions.vue'

export default {
  name: 'App',
  components: {
    BinaryOptions
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
