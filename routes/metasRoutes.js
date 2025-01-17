const express = require('express');
const router = express.Router();
const knex = require('../config/knex');

// Rota para consultar todos os metas
router.get('/', async (req, res) => {
  try {
    const metas = await knex('metas').select('*');
    res.json(metas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar metas' });
  }
});

// Rota para adicionar um novo metas
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
    const result = await knex('metas').insert({
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
    console.error('Erro ao adicionar metas:', err);
    res.status(500).json({ error: 'Erro ao adicionar metas' });
  }
});

// Rota para atualizar o campo 'pago' de um metas específico para um mês
router.put('/:id/:mesPago', async (req, res) => {
  const { id, mesPago } = req.params;
  console.log('Dados recebidos:', req.body);

  // Mapeia os meses para os campos correspondentes
  const mesesMap = {
    janeiro: 'janeiro_pago',
    fevereiro: 'fevereiro_pago',
    marco: 'marco_pago',
    abril: 'abril_pago',
    maio: 'maio_pago',
    junho: 'junho_pago',
    julho: 'julho_pago',
    agosto: 'agosto_pago',
    setembro: 'setembro_pago',
    outubro: 'outubro_pago',
    novembro: 'novembro_pago',
    dezembro: 'dezembro_pago'
  };

  // Verifica se o mês é válido
  if (!mesesMap[mesPago]) {
    return res.status(400).json({ error: 'Mês inválido' });
  }

  const campoPago = mesesMap[mesPago]; // Obtém o campo correspondente ao mês
  const { pago } = req.body; // Recebe o status de pagamento (true/false)

  console.log('Atualizando campo:', campoPago, 'com valor:', pago);

  try {
    const result = await knex('metas')
      .where({ id })
      .update({ [campoPago]: pago }); // Atualiza o campo correspondente

    if (result) {
      res.status(200).json({ message: 'Status de pagamento atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'metas não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao atualizar status de pagamento:', err);
    res.status(500).json({ error: 'Erro ao atualizar status de pagamento' });
  }
});


// Rota para atualizar um metas existente
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
    const result = await knex('metas')
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
      res.status(200).json({ message: 'metas atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'metas não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao atualizar metas:', err);
    res.status(500).json({ error: 'Erro ao atualizar metas' });
  }
});


// Rota para deletar um metas pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await knex('metas').where({ id }).del();
    if (rowsDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'metas não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar metas' });
  }
});

module.exports = router;
