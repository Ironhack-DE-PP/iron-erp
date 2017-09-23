const Client = require('../models/Client')


module.exports = {
  allClients: (req, res, next) => {
    res.render('clients/show', { title: 'Clients list'})
  },
  client: (req, res, next) => {
    res.render('clients/show')
  },
  newClient: (req, res, next) => {},
  getEditClient: (req, res, next) => {},
  postEditClient: (req, res, next) => {},
  deleteClient: (req, res, next) => {
    const clientID = req.params.id

    Client.findByIdAndRemove(clientID)
      .then(() => res.redirect('/clients'))
      .catch(err => next(err))
  }
}