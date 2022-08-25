$("#navbar").load("navbar.html");
$("#footer").load("footer.html");
$("#main").load("homepage.html");
let products
let address

function addtocart(id) {
    let cart = getCookie('cart')
    cart += ',' + id
    setCookie('cart', cart, 1)
    updateCart(cart.split(',').length - 1)
}

function buynow(id) {
    addtocart(id)
    $("#main").load("cart.html");
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function cartTotal() {
    let cart = getCookie('cart')
    return cart ? cart.split(',').length - 1 : 0
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
