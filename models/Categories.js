const Sequelize = require('sequelize');
const db = require('../database/db');


const Categories = db.define('Andre_categorias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull:false,
    },
    
    
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
    
})

//Criar a tabela com sequelize
// Categories.sync();

//Excluir a tabela e criar novamente
// User.sync({ force: true});

//Verificar se há alguma diferença na tabela, realiza alteração
// User.sync({ alter: true});

//Cadastrar registro no banco de dados
// User.create({
//     name:"Aluno",
//     email:"email@example.com",
//     gender:'M'
// })

module.exports = Categories;