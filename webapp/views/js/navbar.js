$("#products").click(() => {
    $("#main").load("products.html");
});

$("#logo").click(() => {
    $("#main").load("homepage.html");
});

$("#contact-us").click(() => {
    $("#main").load("contact-us.html");
});
$("#search").click(() => {
    $("#main").load("search.html");
});
$("#cart").click(() => {
    $("#main").load("cart.html");
});

updateCart(getCookie('cart').split(',').length - 1)

function updateCart(value) {
    $("#badge-cart").attr("value", value)

}