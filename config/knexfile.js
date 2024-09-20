const config = require('./config.json');

const { username, password, hostname, port, dbname } = config.database;

const knexConfig = {
  client: 'pg', 
  connection: {
    host: hostname,
    port: port,
    user: username,
    password: Buffer.from(password, 'base64').toString('utf8'), 
    database: dbname,
  },
};

module.exports = knexConfig;
