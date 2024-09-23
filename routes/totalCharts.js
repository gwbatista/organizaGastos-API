const express = require('express');
const router = express.Router();
const knex = require('../config/knex');

// Rota para buscar gastos por mês
router.get('/', async (req, res) => {
  try {
    const gastos = await knex.raw(`
      SELECT 
        'janeiro' AS mes, 
        COALESCE(SUM(moradia.janeiro), 0) AS moradia, 
        COALESCE(SUM(pessoal.janeiro), 0) AS pessoal, 
        COALESCE(SUM(empresa.janeiro), 0) AS empresa
      FROM 
        (SELECT janeiro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT janeiro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT janeiro FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'fevereiro' AS mes, 
        COALESCE(SUM(moradia.fevereiro), 0), 
        COALESCE(SUM(pessoal.fevereiro), 0), 
        COALESCE(SUM(empresa.fevereiro), 0)
      FROM 
        (SELECT fevereiro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT fevereiro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT fevereiro FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'março' AS mes, 
        COALESCE(SUM(moradia.marco), 0), 
        COALESCE(SUM(pessoal.marco), 0), 
        COALESCE(SUM(empresa.marco), 0)
      FROM 
        (SELECT marco FROM gastos) AS moradia
      FULL JOIN 
        (SELECT marco FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT marco FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'abril' AS mes, 
        COALESCE(SUM(moradia.abril), 0), 
        COALESCE(SUM(pessoal.abril), 0), 
        COALESCE(SUM(empresa.abril), 0)
      FROM 
        (SELECT abril FROM gastos) AS moradia
      FULL JOIN 
        (SELECT abril FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT abril FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'maio' AS mes, 
        COALESCE(SUM(moradia.maio), 0), 
        COALESCE(SUM(pessoal.maio), 0), 
        COALESCE(SUM(empresa.maio), 0)
      FROM 
        (SELECT maio FROM gastos) AS moradia
      FULL JOIN 
        (SELECT maio FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT maio FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'junho' AS mes, 
        COALESCE(SUM(moradia.junho), 0), 
        COALESCE(SUM(pessoal.junho), 0), 
        COALESCE(SUM(empresa.junho), 0)
      FROM 
        (SELECT junho FROM gastos) AS moradia
      FULL JOIN 
        (SELECT junho FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT junho FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'julho' AS mes, 
        COALESCE(SUM(moradia.julho), 0), 
        COALESCE(SUM(pessoal.julho), 0), 
        COALESCE(SUM(empresa.julho), 0)
      FROM 
        (SELECT julho FROM gastos) AS moradia
      FULL JOIN 
        (SELECT julho FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT julho FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'agosto' AS mes, 
        COALESCE(SUM(moradia.agosto), 0), 
        COALESCE(SUM(pessoal.agosto), 0), 
        COALESCE(SUM(empresa.agosto), 0)
      FROM 
        (SELECT agosto FROM gastos) AS moradia
      FULL JOIN 
        (SELECT agosto FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT agosto FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'setembro' AS mes, 
        COALESCE(SUM(moradia.setembro), 0), 
        COALESCE(SUM(pessoal.setembro), 0), 
        COALESCE(SUM(empresa.setembro), 0)
      FROM 
        (SELECT setembro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT setembro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT setembro FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'outubro' AS mes, 
        COALESCE(SUM(moradia.outubro), 0), 
        COALESCE(SUM(pessoal.outubro), 0), 
        COALESCE(SUM(empresa.outubro), 0)
      FROM 
        (SELECT outubro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT outubro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT outubro FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'novembro' AS mes, 
        COALESCE(SUM(moradia.novembro), 0), 
        COALESCE(SUM(pessoal.novembro), 0), 
        COALESCE(SUM(empresa.novembro), 0)
      FROM 
        (SELECT novembro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT novembro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT novembro FROM empresa_2024) AS empresa ON 1=1
      
      UNION ALL
      
      SELECT 
        'dezembro' AS mes, 
        COALESCE(SUM(moradia.dezembro), 0), 
        COALESCE(SUM(pessoal.dezembro), 0), 
        COALESCE(SUM(empresa.dezembro), 0)
      FROM 
        (SELECT dezembro FROM gastos) AS moradia
      FULL JOIN 
        (SELECT dezembro FROM guilherme_2024) AS pessoal ON 1=1
      FULL JOIN 
        (SELECT dezembro FROM empresa_2024) AS empresa ON 1=1
    `);

    res.json(gastos.rows); // Retorna os dados dos gastos
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
