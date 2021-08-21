const express = require('express')
const path = require('path')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose') // connect mongodb
const BlogPost = require('./models/BlogPost.js')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
// create MiddleWare
const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
    // controller
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')



app.use(fileUpload())
app.use('/posts/store', validateMiddleware) // 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))

// session
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});


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

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)


// register user
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

// store user
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

// login gui
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

// login user
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

// logout
app.get('/auth/logout', logoutController)

// not found route
app.use((req, res) => res.render('notfound'));