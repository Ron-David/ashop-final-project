const mongoose = require('mongoose')
const { Schema } = mongoose;


const productSchema = new Schema({
    title: String,
    description: String,
    img: String,
    price: Number,
    visits: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 },
    barcode: { type: Number, unique: true }
});

const optionsSchema = new Schema({
    key: String,
    value: String
});

const Product = mongoose.model('Product', productSchema);
const Options = mongoose.model('Options', optionsSchema);

class Modal {

    createProduct(title, desc, price, barcode, img) {
        const product = new Product({ title, description: desc, price, barcode, img })
        product.save()
        return product
    }

    async deleteProduct(barcode) {
        const product = await Product.findOne({ barcode: barcode })
        if (product) {
            product.remove()
        }
        return product
    }

    async getAllProducts() {
        return await Product.find()
    }

    async getSearchProducts(search) {
        const r = '.*' + String(search) + '.*'
        const products = await Product.find(
            {
                $or: [
                    { title: { $regex: r } },
                    { description: { $regex: r } }
                ]
            }
        )
        return products
    }

    async getProduct(id) {
        const product = await Product.findOne({ barcode: id })

        if (!product) {
            return false
        }
        return product
    }



    async getAddress() {
        return await Options.findOne({ key: 'address' })
    }
}

const modal = new Modal()

// let address = new Options({
//     key: 'address', value: JSON.stringify({
//         city: 'tel-aviv'
//         , street: 'moshe-dayan',
//         number: '8'
//     })
// })
// address.save()
module.exports = { modal }