import { connect } from 'mongoose';

export default function(url) {
  return connect(url, { useNewUrlParser: true });
}