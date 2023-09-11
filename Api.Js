const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()

app.use(express.json())


const projetos = []


app.get('/projetos', function(req,res){
      return res.json(projetos)
})

app.post('/projetos', function(req,res){
   const {name, owner} = req.body
   const projeto = {
      id: uuidv4(),
      name,
      owner
   }

   projetos.push(projeto)

   return res.status(201).json(projeto)
})


app.put('/projetos/:id', function(req,res){
   const {id} = req.params
   const {name, owner} = req.body
   
   const projetoIndex = projetos.findIndex(p => p.id === id)

   if(projetoIndex < 0 ){
      return res.status(404).json({error: 'projeto not found'})
   }

   if(!name && !owner){
      return res.status(400).json({error: 'name and owner are required'})
   }

   const projeto = {
       id,
       name,
       owner
   }

    projetos[projetoIndex] = projeto
   
   return res.json(projeto)
})


app.delete('/projetos/:id', function(req,res){
   return res.json([
      'projeto 2',
      'projeto 3'
   ])
})

app.listen(3000, () => {
     console.log('server working at the port 3000')
})
