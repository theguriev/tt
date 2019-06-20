export default function(string, def = {}) {
  try {
    return JSON.parse(string);
  } catch(e) {
    return def;
  }
}