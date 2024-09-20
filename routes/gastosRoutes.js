const express = require('express');
const router = express.Router();
const knex = require('../config/knex');

// Rota para consultar todos os gastos
router.get('/', async (req, res) => {
  try {
    const gastos = await knex('gastos').select('*');
    res.json(gastos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar gastos' });
  }
});

// Rota para adicionar um novo gasto
router.post('/', async (req, res) => {
  const { descricao, valor, data_vencimento } = req.body;
  console.log('Dados recebidos:', { descricao, valor, data_vencimento });
  try {
    const result = await knex('gastos').insert({ descricao, valor, data_vencimento }).returning('id');
    const id = Array.isArray(result) ? result[0] : result;
    console.log('ID inserido:', id);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Erro ao adicionar gasto:', err);
    res.status(500).json({ error: 'Erro ao adicionar gasto' });
  }
});

// Rota para deletar um gasto pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await knex('gastos').where({ id }).del();
    if (rowsDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Gasto não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar gasto' });
  }
});

module.exports = router;
