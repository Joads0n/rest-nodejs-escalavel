const Model = require("./modelTabFornecedor")
const NaoEncontrado = require('../../erros/NaoEcontrado')

module.exports = {
    listar () {
        return Model.findAll({raw: true})
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
            throw new NaoEncontrado()
        }
        return encontrado
    },
    atualizar(id, dados){
        return Model.update(dados, {where: { id: id }})
    },
    remover(id){
        Model.destroy({ where: {id: id} })
    }
}