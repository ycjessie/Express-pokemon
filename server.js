const express = require("express");
const app = express();
const port = 3000;
//include the method-override package
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
//DATA

const pokemons = require("./models/pokemon");
//configuration
app.set('view engine', 'ejs');
//MIDDLEWARE
//body-parser
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
//For POST ROUTE req.body
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressLayouts);

//ROUTE
//POST ROUTE when create NEW
app.post('/pokemons', (req, res)=>{
    // console.log('post route',req.body)
    // res.send('Post route is working')
    // res.send(req.body)
    pokemons.push(req.body)
    res.redirect('/pokemons')
   
})
//Index ROUTE
app.get("/pokemons", (req, res) => {
  //console.log('Index');
  //res.send(pokemons);
  res.render('index.ejs',{
      data: pokemons
  })
});
//New ROUTE
app.get("/pokemons/new", (req,res)=>{
    //console.log('new page')
    res.render("new.ejs")
});
//SHOW ROUTE
app.get("/pokemons/:id", (req,res)=>{
    // console.log(req.params)
    // res.send(pokemons[req.params.id]);
    res.render('show.ejs',{
        data:pokemons[req.params.id],
        id:req.params.id,
    })
})
//UPDATE
app.put("/pokemons/:id",(req,res)=>{
   
    // console.log("update route")
    //res.send(pokemons)//populate the whole object
     pokemons[req.params.id]=req.body
    //res.send(req.body)//populate only one at the time
    res.redirect('/pokemons')
})
//EDIT ROUTE
app.get("/pokemons/:id/edit", (req,res)=>{
     //console.log('edit page')
     //res.send(pokemons[req.params.id])
    
     res.render("edit.ejs",{
        data:pokemons[req.params.id],//send the whole kay value pairs
        id:req.params.id//and the id of the array
        
     });
})
app.delete('/pokemons/:id', (req, res) => {
	pokemons.splice(req.params.index, 1); //remove the item from the array
	res.redirect('/pokemons');  //redirect back to index route
});
//Port Listening
app.listen(port, () => {
  //console.log("server is listening",port)
  console.log(`server is listening ${port}`);
});
