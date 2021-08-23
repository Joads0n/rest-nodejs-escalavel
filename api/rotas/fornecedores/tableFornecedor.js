const Model = require("./modelTabFornecedor")

module.exports = {
    listar () {
        return Model.findAll()
    },
    inserir(fornecedor){
        return Model.create(fornecedor)
    },
    async pegarPorId(id){
        const encontrado = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado){
            throw new Error('Fornecedor não encontrato')
        }
        return encontrado
    },
    atualizar(id, dados){
        return Model.update(dados, {where: { id: id }})
    }
}