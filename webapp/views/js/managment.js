

$("#add").click(() => {
    $("#sideb").html(getAddProductHtml());
    $("#submitadd").click(() => submitAdd());

});


$("#remove").click(() => {
    $("#sideb").html(getRemoveProductHtml());

    $("#submitremove").click(() => {

        const barcode = $("#removeproduct").val()
        $.ajax({
            type: 'POST',
            data: { barcode },
            url: '/product/delete',
            success: (res) => res == true ? alert('DONE!') : alert('Failed!')
        });
    });

});


$("#update").click(() => {
    $("#sideb").html(getUpdateProductHtml());

    $("#submitupdate").click(() => {
        const title = $("#title_update").val()
        const desc = $("#desc_update").val()
        const price = $("#price_update").val()
        const barcode = $("#barcode_update").val()
        const img = $("#img_update").val()
        $.ajax({
            type: 'POST',
            data: { title, desc, price, barcode, img },
            url: '/product/update',
            success: (res) => res == true ? alert('DONE!') : alert('Failed!')
        });
    });

});



$("#search").click(() => {
    $("#sideb").html(getSearchProductHtml());

    // $("#submitupdate").click(() => {
    //     const title = $("#title_update").val()
    //     const desc = $("#desc_update").val()
    //     const price = $("#price_update").val()
    //     const barcode = $("#barcode_update").val()
    //     const img = $("#img_update").val()

    //     $.ajax({
    //         type: 'POST',
    //         data: { title, desc, price, barcode, img },
    //         url: '/product/update',
    //         success: (res) => res == true ? alert('DONE!') : alert('Failed!')
    //     });
    // });

});

$("#submitadd").click(() => submitAdd());

function submitAdd() {
    const title = $("#title").val()
    const desc = $("#desc").val()
    const price = $("#price").val()
    const barcode = $("#barcode").val()
    const img = $("#img").val()
    $.ajax({
        type: 'POST',
        data: { title, desc, price, barcode, img },
        url: '/product/create',
        success: (res) => res == true ? alert('DONE!') : alert('Failed!')
    });

}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}



function getAddProductHtml() {
    return `
    <div class="container w-50">
    <h1>Add product</h1>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Title</label>
        <input class="form-control form-control-lg my-2" type="text" id="title" placeholder="Pigeon spikes">
    </div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Descreption</label>
        <textarea class="form-control" id="desc" rows="3"></textarea>
        </div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Price</label>
        <input class="form-control form-control-sm" type="text" id="price" placeholder="99">
    </div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Barcode</label>
        <input class="form-control form-control-sm" type="text" id="barcode" placeholder="34864">
    </div>
    <div class="my-2">
        <label for="exampleFormControlFile1">Image</label>
        <input class="form-control form-control-sm" type="text" id="img" placeholder="url">

        <!-- <input type="file" class="form-control-file" id="img" id="exampleFormControlFile1"> -->
    </div>
    <div class="my-2">
        <button class="btn btn-primary my-2" id="submitadd">ADD</button>
    </div>
</div>
    `
}


function getRemoveProductHtml() {
    return `<div class="container w-50">
<h1>Remove product</h1>
<div class="my-2">
    <label for="exampleFormControlTextarea1">Barcode</label>
    <input class="form-control form-control-lg my-2" type="number" id="removeproduct" placeholder="334">
</div>
<div class="my-2">
<button class="btn btn-danger my-2" id="submitremove">REMOVE</button>

</div>
</div>`}

function getUpdateProductHtml() {
    return `
    <div class="container w-50">
    <h1>Update product</h1>
    <div class="my-2">
    <label for="exampleFormControlTextarea1">Which product yoy want to update?</label>
    <input class="form-control form-control-sm" type="text" id="barcode_update" placeholder="barcode">
</div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">New Title</label>
        <input class="form-control form-control-lg my-2" type="text" id="title_update" placeholder="Pigeon spikes">
    </div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Descreption</label>
        <textarea class="form-control" id="desc_update" rows="3"></textarea>
    </div>
    <div class="my-2">
        <label for="exampleFormControlTextarea1">Price</label>
        <input class="form-control form-control-sm" type="text" id="price_update" placeholder="99">
    </div>

    <div class="my-2">
        <label for="exampleFormControlFile1">Image</label>
        <input class="form-control form-control-sm" type="text" id="img_update" placeholder="url">

        <!-- <input type="file" class="form-control-file" id="img" id="exampleFormControlFile1"> -->
    </div>
    <div class="my-2">
        <button class="btn btn-primary my-2" id="submitupdate">UPDATE</button>
    </div>
</div>
    `

}

function getSearchProductHtml() {
    return `
    <div class="d-flex w-50">
    <input class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    `
}