products = []

getCart()
function getCart() {
    let barcodes = getCookie('cart').split(',')

    $.ajax({
        type: 'POST',
        data: { barcodes },
        url: '/api/cart',
        success: (res) => {
            products = res
            setProducts(products)
        },
    });
}

function setProducts(products) {
    $("#cart-products").html('')

    let total = 0

    for (let p of products) {
        total += p.price * p.quantity
        $("#cart-products").append(cartProduct(p.barcode, p.title, p.desc, p.price, "$", p.img, p.quantity));
    }

    $("#total").text(total + '$');
    if (total) {
        $("#payment").removeClass('invisible');

    } else {
        $("#payment").addClass('invisible');

    }

}

function cartProduct(id, title, desc, price, currency, img, quantity = 10) {
    return `    
    <div class="d-flex my-2 shadow-sm align-items-center justify-content-between mt-1 p-2 px-5">
    <div>

        <h5 class="mt-0 font-weight-bold mb-2">${title}</h5>

        <img src="${img}" alt="placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2">
    </div>
    <h6 class="font-weight-bold my-2">${currency}${price}</h6>

    <div class="d-flex btn-group text-center">
        <button onclick="removeProduct(${id})" class="btn btn-outline-primary">-</button>
        <button class="btn btn-outline-primary" disabled>${quantity}</button>

        <button onclick="addProduct(${id})" class="btn btn-outline-primary ">+</button>
    </div>
</div>
`
}

function addProduct(id) {
    addtocart(id)
    getCart()

}
function removeProduct(id) {
    let cart = getCookie('cart')
    if (cart) {
        cart = cart.replace("," + id, '')
    }

    setCookie('cart', cart, 1)
    updateCart(cart.split(',').length - 1)

    getCart()

}


$("#purchase").click(() => {
    let productsIDs = products.map(p => {
        for (let i = 0; i < p.quantity; i++) {

            removeProduct(p.barcode)
        }
        return { barcode: p.barcode, quantity: p.quantity }
    })
    socket.send(JSON.stringify(productsIDs));
    $("#main").load("thankyou.html")
});
