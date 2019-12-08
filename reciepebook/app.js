const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cons=require('consolidate');
const dust=require('dustjs-helpers');
const { Client } = require('pg')
const client = new Client("postgres://reciepebook:reciepebook@localhost/reciepebookdb")
client.connect();

const app=express();


app.set('view engine','ejs')
app.set('views'.__dirname+'/views');


app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    
       client.query('Select * from reciepe')
       .then(results=>{
           res.render('index',{recipes:results.rows});
           
       })
       .catch(err=>{
           console.log(err);
           return res.status(500).json({
               error:err
           })
       })
       
   });

app.post('/add',(req,res,next)=>{
    client.query('INSERT INTO reciepe(name,ingredients,directions) VALUES($1,$2,$3)',
    [req.body.name,req.body.ingredients,req.body.directions])
    .then(results=>{
        console.log("SAVED SUCCESSFUL");
        res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        })
    })
})

app.delete('/delete/:id',(req,res,next)=>{
    client.query('Delete from reciepe where id=$1',
    [req.params.id])
    .then(results=>{
        console.log("Deleted");
        res.status(200).json({
            message:"Deleted"
        });
       
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        })
    })
})

app.post('/edit',(req,res,next)=>
{
    client.query('Update reciepe set name=$1 , ingredients=$2, directions=$3 where id=$4',
    [req.body.name,req.body.ingredients,req.body.directions,req.body.id])
    .then(results=>{
        console.log("Updated");
       res.redirect('/');
       
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        })
    })
})

app.listen(3000,(req,res,next)=>{
    console.log('server started on port 3000');
})