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
  const {
    descricao,
    valor,
    data_vencimento,
    janeiro,
    fevereiro,
    marco,
    abril,
    maio,
    junho,
    julho,
    agosto,
    setembro,
    outubro,
    novembro,
    dezembro,
    pago,
    janeiro_pago,  // Adicionado
    fevereiro_pago, // Adicionado
    marco_pago,     // Adicionado
    abril_pago,     // Adicionado
    maio_pago,      // Adicionado
    junho_pago,     // Adicionado
    julho_pago,     // Adicionado
    agosto_pago,    // Adicionado
    setembro_pago,  // Adicionado
    outubro_pago,   // Adicionado
    novembro_pago,   // Adicionado
    dezembro_pago    // Adicionado
  } = req.body;

  console.log('Dados recebidos:', {
    descricao,
    valor,
    data_vencimento,
    janeiro,
    fevereiro,
    marco,
    abril,
    maio,
    junho,
    julho,
    agosto,
    setembro,
    outubro,
    novembro,
    dezembro,
    pago,
    janeiro_pago,  
    fevereiro_pago, 
    marco_pago,     
    abril_pago,     
    maio_pago,      
    junho_pago,     
    julho_pago,     
    agosto_pago,    
    setembro_pago,  
    outubro_pago,   
    novembro_pago,   
    dezembro_pago    
  });

  try {
    const result = await knex('gastos').insert({
      descricao,
      valor,
      data_vencimento,
      janeiro,
      fevereiro,
      marco,
      abril,
      maio,
      junho,
      julho,
      agosto,
      setembro,
      outubro,
      novembro,
      dezembro,
      pago,
      janeiro_pago,  
      fevereiro_pago, 
      marco_pago,     
      abril_pago,     
      maio_pago,      
      junho_pago,     
      julho_pago,     
      agosto_pago,    
      setembro_pago,  
      outubro_pago,   
      novembro_pago,   
      dezembro_pago    
    }).returning('id');

    const id = Array.isArray(result) ? result[0] : result;
    console.log('ID inserido:', id);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Erro ao adicionar gasto:', err);
    res.status(500).json({ error: 'Erro ao adicionar gasto' });
  }
});


// Rota para atualizar um gasto existente
router.put('/:id', async (req, res) => {
  const { id } = req.params; 
  const { 
    descricao, 
    valor, 
    data_vencimento, 
    janeiro, 
    fevereiro, 
    marco, 
    abril, 
    maio, 
    junho, 
    julho, 
    agosto, 
    setembro, 
    outubro, 
    novembro, 
    dezembro, 
    pago,
    janeiro_pago,  
    fevereiro_pago, 
    marco_pago,     
    abril_pago,     
    maio_pago,      
    junho_pago,     
    julho_pago,     
    agosto_pago,    
    setembro_pago,  
    outubro_pago,   
    novembro_pago,   
    dezembro_pago    
  } = req.body;

  try {
    const result = await knex('gastos')
      .where({ id })
      .update({
        descricao,
        valor,
        data_vencimento,
        janeiro,
        fevereiro,
        marco,
        abril,
        maio,
        junho,
        julho,
        agosto,
        setembro,
        outubro,
        novembro,
        dezembro,
        pago,
        janeiro_pago,  
        fevereiro_pago, 
        marco_pago,     
        abril_pago,     
        maio_pago,      
        junho_pago,     
        julho_pago,     
        agosto_pago,    
        setembro_pago,  
        outubro_pago,   
        novembro_pago,   
        dezembro_pago    
      });

    if (result) {
      res.status(200).json({ message: 'Gasto atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Gasto não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao atualizar gasto:', err);
    res.status(500).json({ error: 'Erro ao atualizar gasto' });
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
