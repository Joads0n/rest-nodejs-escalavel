const Sequelize = require('sequelize')
const connection = require('../../database')

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updateAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = connection.define('fornecedor', colunas, opcoes)