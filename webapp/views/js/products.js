

$.ajax({
    url: '/api/products',
    success: (res) => setProducts(res),
});


function setProducts(products) {
    for (let p of products) {
        $("#products-list").append(getProductHTML(p.barcode, p.title, p.description, p.price, "$", p.img));
    }
}



function getProductHTML(id, title, description, price, currency, img) {
    return `

    <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
    <div class="bg-white rounded shadow-sm">
    <img onclick="gotoproduct(${id})" src=${img} alt="" class="img-fluid card-img-top">
        <div class="p-4">
            <h5 onclick="gotoproduct(${id})"> <a href="#" class="text-dark">${title}</a></h5>
            <p class="small text-muted mb-0">${description}</p>
            <div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2
                mt-4">
                <span class="font-weight-bold">${currency}${price}</span></p>
            </div>
            <div class="d-flex justify-content-end">
                <button onclick="addtocart(${id})" class="btn btn-primary mx-1"><i
                        class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                <button onclick="buynow(${id})" class="btn btn-warning">BUY NOW!</button>
            </div>
        </div>
    </div>
</div>

    `
}


function gotoproduct(id) {
    $.ajax({
        url: `/product/${id}`,
        success: (res) => {
            if (res) {
                let { title, price, description, img } = res

                $("#main").html(getProductPage(id, title, description, price, "$", img))
            }
        },
    });


}



function getProductPage(id, title, description, price, currency, img) {
    return `
    
<div class="container">
<div class="card">
    <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <div class="row">
            <div class="col-lg-5 col-md-5 col-sm-6">
                <div class="white-box text-center"><img src="${img}"
                        class="img-responsive"></div>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-6">
                <h4 class="box-title mt-5">Product description</h4>
                <p>${description}</p>
                <h2 class="mt-5">
                    ${currency}${price}
                </h2>
                <button onclick="addtocart(${id})" class="btn btn-primary mx-1"><i class="fa fa-shopping-cart"
                        aria-hidden="true"></i></button>
                <button onclick="buynow(${id})" class="btn btn-warning">BUY NOW!</button>
            </div>
            
        </div>
    </div>
</div>
</div>
    `
}