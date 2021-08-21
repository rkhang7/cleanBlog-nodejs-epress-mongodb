module.exports = (req, res) => { // we destroy all session data including the session
    req.session.destroy(() => {
        res.redirect('/')
    })
}