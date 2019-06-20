import app from './app';
import db from './db';

const {
  PORT = 8080,
  DATABASE_URL = 'mongodb://localhost:27017/test'
} = process.env;
db(DATABASE_URL).then(
  async () => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
  }
);
