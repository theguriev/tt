import { get } from 'lodash';

export default function(clients, providers) {
  return clients.map(
    el => {
      el = {...el};
      el.providers = el.providers.map(
        p => {
          let provider = providers.find(p2 => p2._id === p);
          if (provider) {
            return provider.name;
          }
          return undefined;
        }
      );
      el.providers = el.providers.filter(el => el).join(', ');
      return el;
    }
  );
}
