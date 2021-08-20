const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });


var id = "611f8878af98ce0db87d7810"

BlogPost.findByIdAndUpdate(id, {
    title: 'Updated title'
}, (error, blogspot) => {
    console.log(error, blogspot)
})