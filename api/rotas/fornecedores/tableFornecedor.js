const Model = require("./modelTabFornecedor")

module.exports = {
    listar () {
        return Model.findAll()
    },
    inserir(fornecedor){
        return Model.create(fornecedor)
    }
}