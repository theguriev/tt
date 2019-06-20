import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import clientMapProviders from './preparation/clientMapProviders'
import filterClients from './preparation/filterClients'
import sortClients from './preparation/sortClients'

Vue.use(Vuex);

const { VUE_APP_API_URL } = process.env;

export const store = new Vuex.Store({
  state: {
    clients: [],
    providers: [],
    errorMessages: [],
    showModal: false,
    currentClient: undefined,
    filter: '',
    sortColumn: 'name',
    sortOrder: true,
  },
  getters: {
    clients(state) {
      let clients = [...state.clients];
      clients = clientMapProviders([...state.clients], state.providers)
      clients = filterClients(state.filter, clients);
      clients = sortClients(state.sortColumn, state.sortOrder, clients);
      return clients;
    },
    client(state) {
      return id => state.clients.find(el => el._id === id);
    }
  },
  mutations: {
    SET_CLIENTS: (state, payload) => {
      state.clients = payload;
    },
    SET_PROVIDERS: (state, payload) => {
      state.providers = payload;
    },
    SET_ERRORS: (state, payload) => {
      state.errorMessages = payload;
    },
    MODAL: (state, payload) => {
      state.showModal = payload;
    },
    SET_CLIENT: (state, payload) => {
      state.currentClient = payload;
    },
    SET_FILTER: (state, payload) => {
      state.filter = payload;
    },
    SET_SORT_COLUMN: (state, payload) => {
      state.sortColumn = payload;
    },
    SET_SORT_ORDER: (state, payload) => {
      state.sortOrder = payload;
    },
  },
  actions: {
    GET_CLIENTS: async ({ commit }) => {
      let {data} = await Axios.get(`${ VUE_APP_API_URL }clients`);
      commit('SET_CLIENTS', data);
      return data;
    },
    GET_PROVIDERS: async ({ commit }) => {
      let {data} = await Axios.get(`${ VUE_APP_API_URL }providers`);
      commit('SET_PROVIDERS', data);
      return data;
    },
    ADD_CLIENT: async (context, payload) => {
      return await Axios.post(`${ VUE_APP_API_URL }clients`, payload);
    },
    DELETE_CLIENT: async (context, payload) => {
      return await Axios.delete(`${ VUE_APP_API_URL }client/${ payload }`);
    },
    SAVE_CLIENT: async (context, payload) => {
      return await Axios.put(
        `${ VUE_APP_API_URL }client/${ payload._id }`,
        {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          providers: payload.providers,
        }
      );
    },
    ADD_PROVIDER: async (context, payload) => {
      return await Axios.post(`${ VUE_APP_API_URL }providers`, payload);
    },
    DELETE_PROVIDER: async (context, id) => {
      return await Axios.delete(`${ VUE_APP_API_URL }provider/${ id }`);
    },
    SAVE_PROVIDER: async (context, payload) => {
      return await Axios.put(`${ VUE_APP_API_URL }provider/${ payload._id }`, { name: payload.name });
    },
    ADD_ERROR: ({ commit, state }, payload) => {
      const { errorMessages } = state;
      commit('SET_ERRORS', [...errorMessages, payload]);
    },
    DELETE_ERRORS: ({ commit }) => {
      commit('SET_ERRORS', []);
    },
    MODAL: ({ commit }, payload) => {
      commit('MODAL', payload);
    },
    CURRENT_CLIENT: ({ commit }, payload) => {
      commit('SET_CLIENT', payload);
    },
    SET_FILTER: ({ commit }, payload) => {
      commit('SET_FILTER', payload);
    },
    SET_SORT_COLUMN: ({ commit, state }, payload) => {
      const allowedColumns = ['name', 'email', 'phone', 'providers'];
      if (allowedColumns.indexOf(payload) > -1) {
        if (payload === state.sortColumn) {
          commit('SET_SORT_ORDER', !state.sortOrder);
        } else {
          commit('SET_SORT_ORDER', true);
          commit('SET_SORT_COLUMN', payload);
        }
      }
    },
  },
});