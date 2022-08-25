
$("#searchi").click(() => {
    let search = $("#searchinput").val()

    $.ajax({
        url: `/products/${search}`,
        success: (res) => setProducts(res),
    });

});

function setProducts(products) {
    $("#products-list").html('')
    for (let p of products) {
        $("#products-list").append(tableItem(p.barcode, p.title, p.price, p.visits));
    }
}
function tableItem(id, title, price, visits) {
    return `
    <tr onclick="gotoproduct(${id})">
    <td width="390">${title}</td>
    <td>${price}$</td>
    <td>${visits}</td>
</tr>
    `
}


function getProductHTML(id, title, description, price, currency, img) {
    return `

    <div onclick="gotoproduct(${id})" class="col-xl-3 col-lg-4 col-md-6 mb-4">
    <div class="bg-white rounded shadow-sm">
        <div class="p-4 d-flex">
            <h5> <a class="text-dark mx-5">${title}</a></h5>
            <p class="small mx-5 text-muted mb-0">${description}</p>
            <div class="d-flex mx-5 align-items-center justify-content-between rounded-pill bg-light px-3 py-2
                mt-4">
                <span class="font-weight-bold">${currency}${price}</span></p>
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