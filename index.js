const {users,cars} = require("./data/data.js");
const express = require("express");
// path =require(" path ")
 const app = express()
const port= 9000
app.get("/",(req,res)=>{
    res.send("hallo")
})


app.get("/users",(req,res)=>{
    res.json(users)
})

app.get("/cars",(req,res)=>{
    res.json(cars)
})
app.get('/users/:id', (req, res) => {
    const id =  (req.params.id) 
    const user =users.find(u=>u.id==id)
    if(user){
        res.json(user)

    }
    else{
        res.status(404).json({ message: "user non trouvée" });
    }
}) 
app.get('/cars/:id', (req, res) => {
    const id =  (req.params.id) 
    const car =cars.find(c=>c.id==id)
    if(car){
        res.json(car)

    }
    else{
        res.status(404).json({ message: "user non trouvée" });
    }
})
app.post("users",(req,res)=>{
    const{Number,mark,Serrer,images}=req.body
    if(!Number||!mark ||Serrer|| images){
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' })
        
    }

})

app.listen(port, () => {
  console.log(` Serveur démarré sur http://localhost:${port}`);
});

