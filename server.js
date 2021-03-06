if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
 
const express=require('express');
const app=express();
const expressLayouts=require("express-ejs-layouts");
const bodyParser=require('body-parser');

//Routes
const indexRouter=require('./routes/index');
const authRouter=require('./routes/authors');

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//MongoDb connection
const mongoose =require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db=mongoose.connection;
db.on('error', function(error){console.log(error)});
db.once('open',function(){console.log("Connected to MongoDB....")});

app.use('/', indexRouter);
app.use('/authors', authRouter);


app.listen(process.env.PORT||3000, function(){
    console.log("Server run in port 3000");
});
