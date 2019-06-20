<template>
  <form v-if="show" class="modal" v-on:submit.prevent="onSubmit">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <div class="content">
      <div class="row">
        <label for="name">Name:</label><input id="name" v-model="name" required>
      </div>
      <div class="row">
        <label for="email">Email:</label><input id="email" v-model="email" type="email" required>
      </div>
      <div class="row">
        <label for="phone">Phone:</label><input id="phone" v-model="phone" required>
      </div>
      <div class="row provider">
        <label for="provider">Providers:</label><input id="provider" v-model="provider">
        <button
          v-if="!currentProvider"
          type="button"
          v-on:click="addProvider">Add provider</button>
        <button
          v-if="currentProvider"
          type="button"
          v-on:click="saveProvider">Save</button>
      </div>
      <div class="row providers">
        <ul class="providers">
          <li v-if="items.length === 0" class="no-providers">No providers!</li>
          <li v-for="item in items" :key="item._id">
            <label><input type="checkbox" :value="item._id" v-model="providers"> {{ item.name }}</label>
            <div class="edit-button">
              <span
                v-on:click="setCurrentProvider(item)"
                aria-hidden="true"
                class="icon_pencil-edit"></span>
              <span
                v-on:click="deleteProvider(item._id)"
                aria-hidden="true"
                class="icon_trash_alt"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div class="left">
        <button v-if="editMode" v-on:click="deleteClient" type="button" class="red">Delete client</button>
      </div>
      <div class="right">
        <button type="button" v-on:click="cancel">Cancel</button>
        <button v-if="!editMode" type="submit">Add client</button>
        <button v-if="editMode" type="submit">Save</button>
      </div>
    </footer>
  </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Modal',
  computed: mapState({
    show: state => state.showModal,
    items: state => state.providers
  }),
  data() {
    return {
      title: 'New client',
      id: '',
      name: '',
      email: '',
      phone: '',
      provider: '',
      providers: [],
      currentProvider: undefined,
      editMode: false
    };
  },
  props: {},
  methods: {
    async onSubmit() {
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.providers,
      };
      if (this.editMode) {
        await this.$store.dispatch(
          'SAVE_CLIENT',
          {
            _id: this.id,
            ...data,
          }
        );
      } else {
        await this.$store.dispatch('ADD_CLIENT', data);
      }
      await this.$store.dispatch('GET_CLIENTS');
      this.cancel();
    },
    async deleteClient() {
      await this.$store.dispatch('DELETE_CLIENT', this.id);
      await this.$store.dispatch('GET_CLIENTS');
      this.cancel();
    },
    async deleteProvider(id) {
      await this.$store.dispatch('DELETE_PROVIDER', id);
      await this.$store.dispatch('GET_PROVIDERS');
    },
    async addProvider() {
      const name = this.provider;
      if (name !== '') {
        await this.$store.dispatch('ADD_PROVIDER', { name });
        this.$store.dispatch('GET_PROVIDERS');
        this.provider = '';
      }
    },
    setCurrentProvider(provider) {
      this.currentProvider = provider;
      this.provider = provider.name;
    },
    async saveProvider() {
      this.currentProvider.name = this.provider;
      await this.$store.dispatch('SAVE_PROVIDER', this.currentProvider);
      this.$store.dispatch('GET_PROVIDERS');
      this.currentProvider = undefined;
      this.provider = '';
    },
    cancel() {
      this.$store.dispatch('MODAL', false);
      this.$store.dispatch('CURRENT_CLIENT', undefined);
    }
  },
  mounted() {
    this.$store.dispatch('GET_PROVIDERS');
  },
  watch: {
    show(newVal) {
      if (newVal === true) {
        if (this.$store.state.currentClient) {
          this.id = this.$store.state.currentClient._id;
          this.name = this.$store.state.currentClient.name;
          this.email = this.$store.state.currentClient.email;
          this.phone = this.$store.state.currentClient.phone;
          this.providers = this.$store.state.currentClient.providers;
          this.editMode = true;
        } else {
          this.id = '';
          this.name = '';
          this.email = '';
          this.phone = '';
          this.providers = [];
          this.editMode = false;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal{
  position: absolute;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 700px;
  min-height: 300px;
  top: 10%;
  left: 50%;
  margin-left: -350px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
}

header{
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
}

.content{
  flex: 1;
  box-sizing: border-box;
  padding: 10px;
}

footer{
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px;
  box-sizing: border-box;
}

.row{
  width: 100%;
  margin-bottom: 10px;
}

label{
  font-weight: bold;
  width: 200px;
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}

ul.providers{
  border: 1px solid rgba(0, 0, 0, 0.12);
  width: 185px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
}

ul.providers li{
  cursor: pointer;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

ul.providers li label{
  width: auto;
  text-align: left;
}

input{
  min-width: 300px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  min-height: 26px;
  box-sizing: border-box;
  padding: 0 5px;
}

.row.provider input{
  min-width: 185px;
  margin-right: 10px;
}

.row.provider button{
  width: 105px;
}

.row.providers{
  padding-left: 200px;
  box-sizing: border-box;
}

.edit-button span{
  margin-left: 5px;
}

footer .right{
  margin-left: auto;
}

footer .right button:last-child{
  margin-left: 10px;
}

h2{
  color: #245A6A;
  font-size: 18px;
  font-weight: bold;
}
</style>
