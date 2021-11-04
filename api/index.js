const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEcontrado')
const CampoInvalido = require('./erros/NaoEcontrado')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const { application } = require('express')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json())

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        res.status(406)
        res.end()
        return
    }
    res.setHeader('Content-Type', formatoRequisitado)
    next()
})

app.use('/api/fornecedores', roteador)

app.use((error, req, res, proximo) => {
    let status = 500
    if(error instanceof NaoEncontrado){
        status = 404
    }
    if(error instanceof CampoInvalido || error instanceof DadosNaoFornecidos){
        status = 400
    }
    if(error instanceof ValorNaoSuportado){
        status = 406
    }
    res.status(status)
    res.send(JSON.stringify({
        message: error.message,
        id: error.idErro
    }))
})

app.listen(config.get('api.port'), () => console.log('SERVER ON'))