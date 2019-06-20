<template>
  <div v-if="messages.length" class="error-bar">
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <button type="button" v-on:click="close"><span aria-hidden="true" class="icon_close"></span></button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ErrorBar',
  computed: mapState({
    messages: state => state.errorMessages,
  }),
  methods: {
    close() {
      this.$store.dispatch('DELETE_ERRORS');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 50px;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    display: flex;
    padding: 20px 20px 20px 40px;
    box-sizing: border-box;
    flex-direction: column;
  }

  button{
    position: absolute;
    top: 10px;
    right: 20px;
    border: 0;
    background: transparent;
    font-size: 20px;
    color: #721c24;
  }

  button:hover{
    background: transparent;
  }

  ul{
    list-style: circle;
  }
</style>
