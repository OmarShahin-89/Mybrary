const express=require('express');
const router=express.Router();
const Author=require('../models/author');
const Book=require('../models/book');
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
        res.redirect(`authors/${newAuthor.id}`);
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error creating author'
        });
    }
});

router.get('/:id', async function(req, res){
    try{
        const author=await Author.findById(req.params.id);
        const books=await Book.find({author: author.id}).limit(6).exec();
        res.render('authors/show',{
            author: author,
            booksByAuthor: books
        })
    }catch(err) {
        console.log(err);
        res.redirect('/');
    }

    
});

router.get('/:id/edit', async function(req, res){

    try{
        const author=await Author.findById(req.params.id);
        res.render('authors/edit', {author: author });
    }catch{
        res.redirect('/authors');
    }
});

router.put('/:id', async function(req, res){
    let author;
    try{
        author=await Author.findById(req.params.id);
        author.name=req.body.name;
        await author.save();
        res.redirect(`/authors/${author.id}`);
    }catch{
        if(author == null){
            res.redirect('/');
        }else{
            res.render('authors/edit',{
                author: author,
                errorMessage: 'Error updating author'
            });
        }
    }
});

router.delete('/:id', async function(req, res){
    let author;
    try{
        author=await Author.findById(req.params.id);
        author.name=req.body.name;
        await author.remove();
        res.redirect('/authors');
    }catch{
        if(author == null){
            res.redirect('/');
        }else{
            res.redirect(`/authors/${author.id}`)
        }
    }
    res.send(`Delete author ${req.params.id}`);
});


module.exports=router;