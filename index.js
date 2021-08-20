const express = require('express')
const path = require('path')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose') // connect mongodb
const BlogPost = require('./models/BlogPost.js')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
    // create MiddleWare
const validateMiddleware = require("./middleware/validationMiddleware");
// controller
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

app.use(fileUpload())
app.use('/posts/store', validateMiddleware) // 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.listen(4000, () => {
    console.log('App listening on port 4000');
})

app.get('/', homeController)

app.get('/about', (req, res) => {
    res.render('about'); // using ejs
})
app.get('/contact', (req, res) => {
    res.render('contact'); // using ejs
})
app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

// app.post('/posts/store', async(req, res) => {
//     // console.log(req.body)
//     // console.log(req.body.title)
//     // console.log(req.body.body)
//     await BlogPost.create(req.body, (error, blogpost) => {
//         res.redirect('/')
//     })
// })
app.post('/posts/store', storePostController)


// register user
app.get('/auth/register', newUserController)

// store user
app.post('/users/register', storeUserController)