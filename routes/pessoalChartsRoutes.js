const express = require('express');
const router = express.Router();
const knex = require('../config/knex');

router.get('/', async (req, res) => {
  try {
    const gastos = await knex('guilherme_2024')
      .select('descricao', 
        knex.raw('janeiro AS Janeiro'), 
        knex.raw('fevereiro AS Fevereiro'), 
        knex.raw('marco AS Março'), 
        knex.raw('abril AS Abril'), 
        knex.raw('maio AS Maio'), 
        knex.raw('junho AS Junho'), 
        knex.raw('julho AS Julho'), 
        knex.raw('agosto AS Agosto'), 
        knex.raw('setembro AS Setembro'), 
        knex.raw('outubro AS Outubro'), 
        knex.raw('novembro AS Novembro'), 
        knex.raw('dezembro AS Dezembro'))
      .whereNot({ descricao: null }); // Filtra descrições nulas, se necessário
    res.json(gastos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
