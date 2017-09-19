const bcrypt = require('bcrypt')
const bcryptSalt = 10
const User = require('../models/User')

module.exports = {
  get: (req, res, next) => {
    res.render('users/new')
  },
  post: (req, res, next) => {
    const username = req.body.user
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    const email = req.body.email
    const rol = req.body.rol

    if (username === '' && password === '') {
      res.render('users/new', {
        message: 'Indicate username and password'
      })
    }

    User.findOne({
      username
    }, 'username', (err, user) => {
      if (user !== null) {
        res.render('users/new', {
          message: 'The username already exists'
        })
        return
      }

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      const newUser = new User({
          username,
          firstName,
          lastName,
          password: hashPass,
          email,
          rol
        })
        .save()
        .then(user => res.redirect("/users"))
        .catch(err => console.log("error"))
    })
  },
  get_edit: (req, res, next) => {
    User.findById(req.params.id, (err, selectedUser) => {
      if(err) next(err)
      res.render('users/edit', {selectedUser})
    })
  },
  put: (req, res, next) => {
    const user = new User({
      user: req.body.user,
      email: req.body.email,      
      password: req.body.password,
      rol: req.body.rol
    }).save()
    .then(user => res.redirect('/users'))
    .catch(err => next(err))
  },
  delete: (req, res, next) => {
    const userID = req.params.id
    console.log(userID)

    User.findByIdAndRemove(userID, (err, user) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/users');
    })
  }
}