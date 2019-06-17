const isAuthenticated = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      return next()
    } else {
      res.redirect('/home')
    }
  } else {
    res.redirect('/')
  }
}

module.exports = isAuthenticated
