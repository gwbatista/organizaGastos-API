const express = require('express');
const cors = require('cors');
const gastosRoutes = require('./routes/gastosRoutes');
const pessoalRoutes = require('./routes/pessoalRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const gastosChartsRoutes = require('./routes/gastosChartsRoutes');
const pessoalChartsRoutes = require('./routes/pessoalChartsRoutes');
const empresaChartsRoutes = require('./routes/empresaChartsRoutes');
const totalCharts = require('./routes/totalCharts');
const knex = require('./config/knex');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/gastos', gastosRoutes); 
app.use('/pessoal', pessoalRoutes); 
app.use('/empresa', empresaRoutes); 
app.use('/ctotal', totalCharts); 
app.use('/cgastos', gastosChartsRoutes); 
app.use('/cpessoal', pessoalChartsRoutes);
app.use('/cempresa', empresaChartsRoutes);  

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

