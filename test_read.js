const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

// find all
BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})

// find by title
BlogPost.find({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills'
}, (error, blogspot) => {
    console.log(error, blogspot)
})

//  '/' acts like  '%'
BlogPost.find({
    title: /The/
}, (error, blogspot) => {
    console.log(error, blogspot)
})

// find by id

var id = "5cb436980b33147489eadfbb";
BlogPost.findById(id, (error, blogspot) => {
    console.log(error, blogspot)
})