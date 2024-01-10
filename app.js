//jshint esversion:6 

const bodyParser = require("body-parser");
const express=require("express");
const ejs=require('ejs');
const lodash = require("lodash");
const mongoose = require("mongoose");


const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/public/images/',express.static('./public/images'));

mongoose.connect("mongodb+srv://admin-yash:test-1234@cluster0.wulzegj.mongodb.net/pawpalDB");
  const postSchema = {
    title : String,
    content: String,
  };

const Post = mongoose.model("Post",postSchema);

app.get('/',function(req,res){
    res.render('home');
});

app.get('/adopt',function(req,res){
    res.render('adopt');
});

app.get("/blog", function(req, res){

  Post.find({}, function(err, posts){
      res.render("blog", {
        posts: posts
        });
    });
    
  });

app.post("/blog", function(req, res){
  
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
    post.save();
  
    res.redirect("/blog");
  
});

app.get('/terms',function(req,res){
    res.render('terms');
});

app.get("/compose", function(req, res){
    res.render("compose");
  });

app.post("/compose", function(req, res){
  
    const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
    });
  
    post.save();
  
    res.redirect("/blog");
  
});

app.post('/',function(){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
});

app.get('/posts/:postName',function(req,res){

  Post.find({}, function(err, posts){
  posts.forEach(function(post){
     
      if(lodash.lowerCase(req.params.postName)===lodash.lowerCase(post.title))
      {
        res.render('post',{title: post.title , content:post.postBody});
      }
    })
  });
  
    
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started");
  });