const express = require('express')
var session = null
var searchbox = null

const {
    db,
    vendors,
    products,
    carts
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/',
  express.static(__dirname + '/public')
)

app.get('/vendor', async (req, res) => {
  const vendor = await vendors.findAll()
  res.send(vendor)
})

app.post('/vendor', async (req, res) => {
    try {
        const result = await vendors.create({
        vendor_name: req.body.vendor_name
      })
      res.send({success: true})
    } catch (e) {
      res.send({success: false, err: e.message})
    }
  })

  app.get('/product', async (req,res) => {
    const product = await products.findAll()
    res.send(product)
  })

  app.post('/product', async (req, res) => {
    try{
      const resultP = await products.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_qty: req.body.product_qty,
        vendor_id: req.body.vendor_id
      })
      res.send({success: true})
    }
    catch{
      res.send({success: false, err: e.message})
    }
  })

  app.post('/shopping', async (req,res) => {
    try{
      session = req.body.username
      res.send({success: true})
    }
    catch(e){
      res.send({success: false, err: e.message})
    }
  })

  app.get('/shopping', async (req,res) => {
    const filter_product = await products.findAll({
      where: {
        product_name: searchbox
      }
    })
    res.send(filter_product)
  })

  app.get('/cart', async (req,res) => {
    const cart_product = await carts.findAll({
      attributes: ['product_id', 'cart_qty'],
      where: {
        username: session
      }
    })
    res.send(cart_product)
  })

  app.post('/cart', async (req,res) => {
    try{
      const resultC = await carts.create({
        product_id: req.body.productId,
        username: session,
        cart_qty: req.body.quantity
      })
      res.send({success: true})
    }
    catch{
      res.send({success: false, err: e.message})
    }
  })

  app.post('/searching', async (req,res) => {
    try{
      searchbox = req.body.searchbox
      res.send({success: true})
    }
    catch{
      res.send({success: false, err: e.message})
    }
  })

  const PORT = process.env.PORT || 8989
  db.sync()
  .then(() => {
    app.listen(PORT)
  })