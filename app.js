const express = require('express');
// const bcrypt = require('bcryptjs');
const app = express();
const Categories =require('./models/Categories');
require('dotenv').config ();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get("/",function (request,response){
    response.send("Serviço API Rest iniciada...");
})

app.get("/categorias", async(req,res) =>{
    await   Categories.findAll({
        atributes: ['id' , 'name', 'description'],
        order:[['name','ASC']]
    })
    .then((categories) =>{
        return res.json({
            erro :false,
            categories
        });
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem: `Erro: ${err} ou Nenhuma categoria encontrada`
        })
    })
})
    app.get('/categoria/:id', async(req,res) =>{
        const { id } = req.params;
        try{
            // await User.findAll({where:{id:id}})
            const users = await Categories.findByPk(id);
            if (!users){
                return res.status(400).json({
                    erro: true,
                    mensagem:"Erro: Nenhuma categoria encontrada!"
                })
            }

            res.status(200).json({
                erro: false,
                users
            })
        } catch (err){
            res.status(400).json({
                erro:true,
                mensagem:`Erro: ${err}`
            })
        }
    });

app.post("/categoria", async (req,res) =>{
    // var dados = req.body;
    // console.log(dados);
    // dados.password = await bcrypt.hash(dados.password, 8);
    // console.log(dados.password);
    // const {name, email, description} = req.body
    
    await  Categories.create(req.body)
    .then( ()=>{
        return res.json({
            erro:false,
            mensagem: 'Categoria cadastrada com sucesso'
        });
    }).catch(err =>{
        return res.status(400).json({
            erro:true,
            mensagem:`Erro: Categoria não cadastrada...${err}`
        })
    })
})

app.put("/categoria", async (req, res) => {
    const { id } = req.body;

    await  Categories.update(req.body,{where: {id}})
    .then(() =>{
        return res.json({
            erro:false,
            mensagem:'Categoria cadastrada com sucesso'

        })
    }).catch((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem:`Erro:Categoria não alterada...${err}`
        })
    })

})

app.delete("/categoria/:id",async (req, res) => {
    const { id } = req.params;
    await  Categories.destroy({where: {id}})
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Categoria apagada com sucesso!"
        });
    }).catch ((err) =>{
        return res.status(400).json({
            erro: true,
            mensagem:`Erro: ${err} Categoria não apagada...`
        })
    })
})

app.listen(process.env.PORT,() =>{
    console.log(`Servidor iniciado na porta ${process.env.PORT} http://localhost:${process.env.PORT}`)
})