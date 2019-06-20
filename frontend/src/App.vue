<template>
  <div id="app">
    <Clients></Clients>
    <ErrorBar></ErrorBar>
  </div>
</template>

<script>
import Clients from './components/Clients.vue'
import ErrorBar from './components/ErrorBar.vue'

export default {
  name: 'app',
  components: {
    Clients,
    ErrorBar
  }
}
</script>

<style>
  #app{
    margin: 0 auto;
    width: 900px;
  }
</style>
