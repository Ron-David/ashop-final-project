const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { connect } = require('./db');
const { controller } = require('./server/Controller');
const { wsServer } = require('./server/socket');

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/webapp/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/webapp/views/main.html")
})

app.get('/api/products', async (req, res) => {
    const products = await controller.getAllProducts()
    res.send(products)
})

app.get('/products/:search', async (req, res) => {
    let { search } = req.params;
    const products = await controller.getSearchProducts(search)
    res.send(products)
})


app.post('/api/cart', async (req, res) => {
    let { barcodes } = req.body;
    barcodes = barcodes.sort();
    let products = [];
    (await controller.getAllProducts()).map(p => {

        if (barcodes.find(barcode => barcode == p.barcode)) {
            let p_copy = {}
            p_copy.title = p.title
            p_copy.price = p.price
            p_copy.barcode = p.barcode
            p_copy.img = p.img
            p_copy.quantity = barcodes.filter(i => i == p.barcode).length
            products.push(p_copy)
        }
    })

    res.send(products)
})
app.get('/product/:id', async (req, res) => {
    let { id } = req.params;

    const product = await controller.getProduct(id, true)
    res.send(product)
})

app.get('/api/address', async (req, res) => {
    const address = await controller.getAddress()
    res.send(address)
})

app.post('/product/create', async (req, res) => {
    let { title, desc, price, barcode, img } = req.body;

    const product = await controller.createProduct(title, desc, price, barcode, img)
    res.send(product ? true : false)
})

app.post('/product/update', async (req, res) => {
    let { title, desc, price, barcode, img } = req.body;
    const product = await controller.updateProduct(title, desc, price, barcode, img)
    res.send(product ? true : false)
})

app.post('/product/delete', async (req, res) => {
    let { barcode } = req.body;
    if (!barcode) {
        res.send(false)

    }
    const deleted = await controller.deleteProduct(barcode)
    res.send(deleted ? true : false)
})

app.listen(port, () => {
    console.log(`
    web app listening on: http://localhost:${port}/`)
})

connect()
wsServer.init()

//////
// const ws = require('ws');
// const wsServer = new ws.Server({ noServer: true });
// wsServer.on('connection', socket => {
//   socket.on('message', message => console.log(message));
// });
// ///
// const http = require('http');
// const server = http.createServer(app_s);
// const { Server } = require("socket.io");
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });