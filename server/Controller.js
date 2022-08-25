const { modal } = require("./Model");

class Controller {
    async createProduct(title, desc, price, barcode, img) {
        return await modal.createProduct(title, desc, price, barcode, img)
    }

    async updateProduct(title, desc, price, barcode, img) {
        const product = await modal.getProduct(barcode)

        if (product) {
            product.title = title ? title : product.title
            product.price = price ? price : product.price
            product.description = desc ? desc : product.description
            product.img = img ? img : product.img
            await product.save()
            return true
        }
        return false
    }

    async deleteProduct(barcode) {
        return await modal.deleteProduct(barcode)
    }

    async getAllProducts() {
        this.products = await modal.getAllProducts()
        return this.products
    }
    async getSearchProducts(search) {
        const product = await modal.getSearchProducts(search)
        return product
    }

    async getProduct(id, visit) {
        const product = await modal.getProduct(id)
        if (!product) {
            return false
        }
        if (visit) {
            product.visits += 1
            await product.save()
        }
        return product
    }

    async getAddress() {
        let addr = await modal.getAddress()

        addr = JSON.parse(addr.value)
        return addr
    }

    async purchased(barcode, quantity) {
        const product = await modal.getProduct(barcode)
        if (!product) {
            return false
        }
        product.purchased += quantity
        await product.save()

    }
}

const controller = new Controller()

module.exports = { controller }