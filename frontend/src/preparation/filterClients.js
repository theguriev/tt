export default function(filter, clients) {
  if (filter !== '') {
    clients = clients.filter(
      el => {
        const f = filter;
        return el.name.indexOf(f) > -1 || el.email.indexOf(f) > -1 || el.phone.indexOf(f) > -1;
      }
    );
  }
  return clients;
}
