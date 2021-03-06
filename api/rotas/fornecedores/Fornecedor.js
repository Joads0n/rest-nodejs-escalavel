const TableFornecedor = require('./tableFornecedor')
const CampoInvalido = require('./../../erros/CampoInvalido')
const DadosNaoFornecidos = require('./../../erros/DadosNaoFornecidos')

class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }
    async criar(){
        this.validar()
        const resultado = await TableFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }
    async carregar(){
        const encontrato = await TableFornecedor.pegarPorId(this.id)
        this.empresa = encontrato.empresa
        this.email = encontrato.email
        this.categoria = encontrato.categoria
        this.dataCriacao = encontrato.dataCriacao
        this.dataAtualizacao = encontrato.dataAtualizacao
        this.versao = encontrato.versao
    }
    async atualizar(){
        await TableFornecedor.pegarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach(campo => {
            const valor = this[campo]
            if(typeof valor === 'string' && valor.length > 0){
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos()
        }
        await TableFornecedor.atualizar(this.id, dadosParaAtualizar)
    }
    remover(){
        return TableFornecedor.remover(this.id)
    }
    validar(){
        const campos = ['empresa', 'email', 'categoria']
        campos.forEach(campo => {
            const valor = this[campo]
            if(typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Fornecedor