<template>
  <div>
    <Modal></Modal>
    <header>
      <h1>Clients</h1>
      <input type="text" v-model="filter" placeholder="Filter by name, phone, email">
      <button type="button" v-on:click="newClient">New client</button>
    </header>
    <table class="table100">
      <thead>
        <tr>
          <th v-on:click="setSortColumn('name')">
            Name
            <span v-if="sortColumn === 'name' && sortOrder" aria-hidden="true" class="arrow_triangle-down"></span>
            <span v-if="sortColumn === 'name' && !sortOrder" aria-hidden="true" class="arrow_triangle-up"></span>
          </th>
          <th v-on:click="setSortColumn('email')">
            Email
            <span v-if="sortColumn === 'email' && sortOrder" aria-hidden="true" class="arrow_triangle-down"></span>
            <span v-if="sortColumn === 'email' && !sortOrder" aria-hidden="true" class="arrow_triangle-up"></span>
          </th>
          <th v-on:click="setSortColumn('phone')">
            Phone
            <span v-if="sortColumn === 'phone' && sortOrder" aria-hidden="true" class="arrow_triangle-down"></span>
            <span v-if="sortColumn === 'phone' && !sortOrder" aria-hidden="true" class="arrow_triangle-up"></span>
          </th>
          <th v-on:click="setSortColumn('providers')">
            Providers
            <span v-if="sortColumn === 'providers' && sortOrder" aria-hidden="true" class="arrow_triangle-down"></span>
            <span v-if="sortColumn === 'providers' && !sortOrder" aria-hidden="true" class="arrow_triangle-up"></span>
          </th>
          <th width="100"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item._id">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.providers }}</td>
          <td><a href="#" v-on:click.prevent="edit(item)">Edit</a> / <a href="#" v-on:click.prevent="del(item)">Delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import { mapGetters, mapState } from 'vuex'
import { debounce } from 'lodash'

export default {
  name: 'Clients',
  data() {
    return {
      filter: ''
    };
  },
  watch: {
    filter() {
      this.debounceFilter();
    }
  },
  components: {
    Modal
  },
  computed: {
    ...mapGetters({
      items: 'clients',
      client: 'client'
    }),
    ...mapState({
      sortColumn: 'sortColumn',
      sortOrder: 'sortOrder',
    })
  },
  props: {},
  created() {
    this.$store.dispatch('GET_CLIENTS');
    this.$store.dispatch('GET_PROVIDERS');
  },
  methods: {
    debounceFilter: debounce(
      function() {
        this.$store.dispatch('SET_FILTER', this.filter);
      },
      500
    ),
    newClient() {
      this.$store.dispatch('MODAL', true);
    },
    async del(item) {
      await this.$store.dispatch('DELETE_CLIENT', item._id);
      this.$store.dispatch('GET_CLIENTS');
    },
    async edit(item) {
      await this.$store.dispatch('CURRENT_CLIENT', this.client(item._id));
      await this.$store.dispatch('MODAL', true);
    },
    setSortColumn(col) {
      this.$store.dispatch('SET_SORT_COLUMN', col);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header{
    margin-top: 100px;
    width: 100%;
    background: #EFF5FB;
    height: 60px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  h1{
    color: #245A6A;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
  }

  button{
    margin-left: auto;
  }

  table{
    width: 100%;
  }

  table thead tr th{
    background: -webkit-gradient(linear, left top, left bottom, from(#FDFDFD), to(#F0F0F0));
    background: linear-gradient(#FDFDFD, #F0F0F0);
    padding: 10px;
    text-align: left;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  table tbody tr td{
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: left;
  }

  input{
    margin-left: 10px;
    min-width: 300px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    min-height: 30px;
    box-sizing: border-box;
    padding: 0 5px;
  }
</style>
