const express = require('express')
const path = require('path')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose') // connect mongodb

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.listen(4000, () => {
    console.log('App listening on port 4000');
})

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index'); // using ejs
})

app.get('/about', (req, res) => {
    res.render('about'); // using ejs
})
app.get('/contact', (req, res) => {
    res.render('contact'); // using ejs
})
app.get('/post', (req, res) => {
    res.render('post'); // using ejs
})