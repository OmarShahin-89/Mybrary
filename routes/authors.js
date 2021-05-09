const { query } = require('express');
const express=require('express');
const router=express.Router();
const Author=require('../models/author');
//All authors
router.get('/', async function(req, res){
    let searchOption={};
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name=new RegExp(req.query.name, 'i');
    }
    try{
        const authors=await Author.find(searchOption);
        res.render("authors/index", {authors:authors, searchOptions: req.query});
    }catch{
        res.redirect('/');
    }
    
});

//New Author Route
router.get('/new', function(req, res){
    res.render('authors/new', {author: new Author()});
});


//New Author creation route
router.post('/', async function(req, res){
    const author=new Author({
        name: req.body.name
    });
    try{
        const newAuthor=await author.save();
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`authors`);
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error creating author'
        });
    }
    /*author.save(function(err, newAuthor){
        if(err){
            res.render('authors/new',{
                author: author,
                errorMessage: 'Error creating author'
            });
        }else{
            //res.redirect(`authors/${newAuthor.id}`);
            console.log(author.name);
            res.redirect(`authors`);
            
        }
    });*/
});


module.exports=router;