export default function(col, order, clients) {
  return clients.sort(
    (a, b) => {
      let left = a;
      let right = b;
      if (!order) {
        left = b;
        right = a;
      }
      return left[col].localeCompare(right[col]);
    }
  )
}