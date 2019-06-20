import axios from 'axios';
import { Service } from 'axios-middleware';
import { get } from 'lodash';
import jsonParse from './pure/jsonParse.js';

const service = new Service(axios);



export default function(store) {
  service.register({
    onResponseError(error) {
      let err = get(jsonParse(error.response.data), 'data', []);
      err.forEach(el => {
        if (el.message) {
          store.dispatch('ADD_ERROR', el.message);
        }
      })
      return error;
    }
  });
}
