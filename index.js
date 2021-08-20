const express = require('express')
const path = require('path')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose') // connect mongodb
const BlogPost = require('./models/BlogPost.js')
const bodyParser =
    require('body-parser')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.listen(4000, () => {
    console.log('App listening on port 4000');
})

app.get('/', async(req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts: blogposts
    }); // using ejs
    console.log(blogposts)
})

app.get('/about', (req, res) => {
    res.render('about'); // using ejs
})
app.get('/contact', (req, res) => {
    res.render('contact'); // using ejs
})
app.get('/post/:id', async(req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async(req, res) => {
    // console.log(req.body)
    // console.log(req.body.title)
    // console.log(req.body.body)
    await BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})