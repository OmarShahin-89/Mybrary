if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
 
const express=require('express');
const app=express();
const expressLayouts=require("express-ejs-layouts");


//Routes
const indexRouter=require('./routes/index');

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));


//MongoDb connection
const mongoose =require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db=mongoose.connection;
db.on('error', function(error){console.log(error)});
db.once('open',function(){console.log("Connected....")});

app.use('/', indexRouter);

app.listen(process.env.PORT||3000, function(){
    console.log("Server run in port 3000");
});
