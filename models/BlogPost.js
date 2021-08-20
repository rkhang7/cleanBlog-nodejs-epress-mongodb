// define model 

const mongoose = require('mongoose')
const Schema = mongoose.Schema; //schema interface to represent the collections in our database
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema); // BlogPost is name of collection
module.exports = BlogPost // export only one variable