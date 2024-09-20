const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastosRoutes');
const knex = require('./config/knex');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/gastos', gastosRoutes); 

knex.raw('select 1+1 as result')
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    app.listen(3000, () => {
      console.log('Servidor está rodando na porta 3000.');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

