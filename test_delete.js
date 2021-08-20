const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

var id = "611f8bcc78958028fcf2977e";
BlogPost.findByIdAndDelete(id, (error, blogspot) => {
    console.log(error, blogspot)
})