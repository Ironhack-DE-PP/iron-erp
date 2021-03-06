const Supplier = require('../models/Supplier')

module.exports = {
  get: (req, res, next) => {
    Supplier.find({})
      .then(suppliers => {
        res.render('suppliers/show', {
          suppliers
        });
      })
  },

  getNew: (req, res, next) => {
    res.render('suppliers/new')
  },

  postNew: (req, res, next) => {
    const name = req.body.supplier;
    const companyName = req.body.companyName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    if (name === '') {
      res.render('suppliers/new', {
        message: 'Indicate name'
      })
    }
    if (companyName === '') {
      res.render('suppliers/new', {
        message: 'Indicate companyName'
      })
    }
    if (phoneNumber === '') {
      res.render('suppliers/new', {
        message: 'Indicate phoneNumber'
      })
    }

    Supplier.findOne({
      name
    }, 'name', (err, supplier) => {
      if (supplier !== null) {
        res.render('suppliers/new', {
          message: 'The name already exists'
        })
        return
      }

      const newSupplier = new Supplier({
          name,
          companyName,
          phoneNumber,
          email
        })
        .save()
        .then(supplier => res.redirect("/suppliers"))
        .catch((err) => next(err))
    })
  },

  getEdit: (req, res, next) => {
    Supplier.findById(req.params.id, (err, selectedSupplier) => {
      if(err) next(err)
      res.render('suppliers/edit', {selectedSupplier})
    })
  },

  postEdit: (req, res, next) => {

   const supplier = {
     name: req.body.supplier,
     companyName: req.body.companyName,
     phoneNumber: req.body.phoneNumber,
     email: req.body.email
   }

   Supplier.findByIdAndUpdate(req.params.id, supplier)
   .then(supplier => res.redirect('/suppliers'))
   .catch(err => next(err))
 },

 delete: (req, res, next) => {
    const supplierID = req.params.id

    Supplier.findByIdAndRemove(supplierID)
      .then(() => res.redirect('/suppliers'))
      .catch(err => next(err))
  }

}
