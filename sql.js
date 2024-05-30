var pg = require('pg');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Demo1',
    password: '123456',
    port: '5432',
  });

  client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err))
  .finally(() => {
    // client.end(); // Uncomment if you want to close the connection after executing queries
  });  

  module.exports = client;