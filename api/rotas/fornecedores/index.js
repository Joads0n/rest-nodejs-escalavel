const roteador = require('express').Router()
const TableFornecedor = require('./tableFornecedor')

roteador.use('/', async (req, res) => {
    const resultados = await TableFornecedor.listar()
    res.send(JSON.stringify(resultados))
})

module.exports = roteador