const Model = require("./modelTabFornecedor")

module.exports = {
    listar () {
        return Model.findAll()
    }
}