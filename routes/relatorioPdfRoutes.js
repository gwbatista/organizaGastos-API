const express = require('express');
const router = express.Router();
const knex = require('../config/knex');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Rota para gerar o relatório em PDF
router.get('/', async (req, res) => {
  try {
    const empresaData = await knex('empresa_2024').select('*');
    const gastosData = await knex('gastos').select('*');
    const pessoalData = await knex('guilherme_2024').select('*');

    // Crie um novo documento PDF
    const doc = new PDFDocument();
    const filePath = './relatorio-gastos.pdf';

    // Pipe o PDF para um arquivo
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Título
    doc.font('Helvetica-Bold').fontSize(20).text('Relatório de Gastos - 2024', { align: 'center' });
    doc.moveDown();

    // Adicionar dados da tabela empresa_2024
    doc.font('Helvetica-Bold').fontSize(18).text('Empresa:', { underline: true });
    doc.moveDown();
    empresaData.forEach((item) => {

      // Calcular o total dos valores dos meses
      const total = (
        parseFloat(item.janeiro || 0) +
        parseFloat(item.fevereiro || 0) +
        parseFloat(item.marco || 0) +
        parseFloat(item.abril || 0) +
        parseFloat(item.maio || 0) +
        parseFloat(item.junho || 0) +
        parseFloat(item.julho || 0) +
        parseFloat(item.agosto || 0) +
        parseFloat(item.setembro || 0) +
        parseFloat(item.outubro || 0) +
        parseFloat(item.novembro || 0) +
        parseFloat(item.dezembro || 0)
      ).toFixed(2); // Formata o total com 2 casas decimais

      doc.font('Helvetica-Bold').fontSize(14).text(`Descrição: ${item.descricao}`);
      doc.moveDown();
      doc.fontSize(12).text(`Janeiro: R$ ${item.janeiro}`);
      doc.fontSize(12).text(`Fevereiro: R$ ${item.fevereiro}`);
      doc.fontSize(12).text(`Março: R$ ${item.marco}`);
      doc.fontSize(12).text(`Abril: R$ ${item.abril}`);
      doc.fontSize(12).text(`Maio: R$ ${item.maio}`);
      doc.fontSize(12).text(`Junho: R$ ${item.junho}`);
      doc.fontSize(12).text(`Julho: R$ ${item.julho}`);
      doc.fontSize(12).text(`Agosto: R$ ${item.agosto}`);
      doc.fontSize(12).text(`Setembro: R$ ${item.setembro}`);
      doc.fontSize(12).text(`Outubro: R$ ${item.outubro}`);
      doc.fontSize(12).text(`Novembro: R$ ${item.novembro}`);
      doc.fontSize(12).text(`Dezembro: R$ ${item.dezembro}`);
      
      // Exibe o total no final
      doc.moveDown();
      doc.font('Helvetica-Bold').fontSize(12).text(`Total: R$ ${total}`);
      doc.moveDown();
      doc.moveDown();
    });

    // Adicionar nova página antes de iniciar a seção de "Gastos"
    doc.addPage();

    // Adicionar dados da tabela gastos
    doc.font('Helvetica-Bold').fontSize(18).text('Moradia:', { underline: true });
    doc.moveDown();
    gastosData.forEach((item) => {

      const total = (
        parseFloat(item.janeiro || 0) +
        parseFloat(item.fevereiro || 0) +
        parseFloat(item.marco || 0) +
        parseFloat(item.abril || 0) +
        parseFloat(item.maio || 0) +
        parseFloat(item.junho || 0) +
        parseFloat(item.julho || 0) +
        parseFloat(item.agosto || 0) +
        parseFloat(item.setembro || 0) +
        parseFloat(item.outubro || 0) +
        parseFloat(item.novembro || 0) +
        parseFloat(item.dezembro || 0)
      ).toFixed(2); // Formata o total com 2 casas decimais

      doc.font('Helvetica-Bold').fontSize(14).text(`Descrição: ${item.descricao}`);
      doc.moveDown();
      doc.fontSize(12).text(`Janeiro: R$ ${item.janeiro}`);
      doc.fontSize(12).text(`Fevereiro: R$ ${item.fevereiro}`);
      doc.fontSize(12).text(`Março: R$ ${item.marco}`);
      doc.fontSize(12).text(`Abril: R$ ${item.abril}`);
      doc.fontSize(12).text(`Maio: R$ ${item.maio}`);
      doc.fontSize(12).text(`Junho: R$ ${item.junho}`);
      doc.fontSize(12).text(`Julho: R$ ${item.julho}`);
      doc.fontSize(12).text(`Agosto: R$ ${item.agosto}`);
      doc.fontSize(12).text(`Setembro: R$ ${item.setembro}`);
      doc.fontSize(12).text(`Outubro: R$ ${item.outubro}`);
      doc.fontSize(12).text(`Novembro: R$ ${item.novembro}`);
      doc.fontSize(12).text(`Dezembro: R$ ${item.dezembro}`);
      
       // Exibe o total no final
       doc.moveDown();
       doc.font('Helvetica-Bold').fontSize(12).text(`Total: R$ ${total}`);
       doc.moveDown();
       doc.moveDown();
    });

    // Adicionar nova página antes de iniciar a seção de "Gastos"
    doc.addPage();

    // Adicionar dados da tabela pessoal
    doc.font('Helvetica-Bold').fontSize(18).text('Guilherme:', { underline: true });
    doc.moveDown();
    pessoalData.forEach((item) => {

      const total = (
        parseFloat(item.janeiro || 0) +
        parseFloat(item.fevereiro || 0) +
        parseFloat(item.marco || 0) +
        parseFloat(item.abril || 0) +
        parseFloat(item.maio || 0) +
        parseFloat(item.junho || 0) +
        parseFloat(item.julho || 0) +
        parseFloat(item.agosto || 0) +
        parseFloat(item.setembro || 0) +
        parseFloat(item.outubro || 0) +
        parseFloat(item.novembro || 0) +
        parseFloat(item.dezembro || 0)
      ).toFixed(2); // Formata o total com 2 casas decimais

      doc.font('Helvetica-Bold').fontSize(14).text(`Descrição: ${item.descricao}`);
      doc.moveDown();
      doc.fontSize(12).text(`Janeiro: R$ ${item.janeiro}`);
      doc.fontSize(12).text(`Fevereiro: R$ ${item.fevereiro}`);
      doc.fontSize(12).text(`Março: R$ ${item.marco}`);
      doc.fontSize(12).text(`Abril: R$ ${item.abril}`);
      doc.fontSize(12).text(`Maio: R$ ${item.maio}`);
      doc.fontSize(12).text(`Junho: R$ ${item.junho}`);
      doc.fontSize(12).text(`Julho: R$ ${item.julho}`);
      doc.fontSize(12).text(`Agosto: R$ ${item.agosto}`);
      doc.fontSize(12).text(`Setembro: R$ ${item.setembro}`);
      doc.fontSize(12).text(`Outubro: R$ ${item.outubro}`);
      doc.fontSize(12).text(`Novembro: R$ ${item.novembro}`);
      doc.fontSize(12).text(`Dezembro: R$ ${item.dezembro}`);
      
       // Exibe o total no final
       doc.moveDown();
       doc.font('Helvetica-Bold').fontSize(12).text(`Total: R$ ${total}`);
       doc.moveDown();
       doc.moveDown();
    });

    // Finalizar o PDF
    doc.end();

    // Enviar o PDF como resposta
    stream.on('finish', () => {
      res.download(filePath, 'relatorio-gastos.pdf', (err) => {
        if (err) {
          console.error('Erro ao enviar PDF:', err);
          res.status(500).json({ error: 'Erro ao gerar o PDF' });
        }

        // Remova o arquivo após download
        fs.unlinkSync(filePath);
      });
    });
  } catch (err) {
    console.error('Erro ao gerar relatório em PDF:', err);
    res.status(500).json({ error: 'Erro ao gerar o relatório' });
  }
});

module.exports = router;
