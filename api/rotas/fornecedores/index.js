const roteador = require('express').Router()
const TableFornecedor = require('./tableFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (req, res) => {
    const resultados = await TableFornecedor.listar()
    res.send(JSON.stringify(resultados))
})

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    res.send(JSON.stringify(fornecedor))
})

roteador.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        res.send(JSON.stringify(fornecedor))
    } catch (err) {
        res.send(JSON.stringify({message: err.message}))
    }
})

roteador.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.end()
    } catch (err) {
        res.send(JSON.stringify({message: err.message}))
    }
})

module.exports = roteador