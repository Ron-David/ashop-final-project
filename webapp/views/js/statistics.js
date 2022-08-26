


$("#sideb").html(`<div class="spinner-border" role="status">
<span class="sr-only">Loading...</span>
</div>`);


$.ajax({
    url: '/api/products',
    success: (p) => {
        if (p) {
            products = p
            $("#sideb").html('')
        }
    }
});



$("#purchased").click(() => {
    $("#sideb").html('');

    $("#sideb").html(getPurchasedHtml(products.sort((a, b) => Number(b.purchased) - Number(a.purchased))));


    const data = products
    let max = data.map(d => Number(d.purchased)).sort(function (a, b) { return b - a })[0]

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 90, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#sideb")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.title; }))
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max * 1.5])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.title); })
        .attr("x2", function (d) { return x(d.title); })
        .attr("y1", function (d) { return y(d.purchased); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.title); })
        .attr("cy", function (d) { return y(d.purchased); })
        .attr("r", "4")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")


});

$("#visits").click(() => {
    $("#sideb").html('');

    // $("#sideb").html(getVisitsHtml(products));
    $("#sideb").html(getVisitsHtml(products.sort((a, b) => Number(b.visits) - Number(a.visits))));

    const data = products
    let max = data.map(d => Number(d.visits)).sort(function (a, b) { return b - a })[0]

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 90, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#sideb")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.title; }))
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max * 1.5])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.title); })
        .attr("x2", function (d) { return x(d.title); })
        .attr("y1", function (d) { return y(d.visits); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.title); })
        .attr("cy", function (d) { return y(d.visits); })
        .attr("r", "4")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")


});

function getVisitsHtml(products) {

    let items = ''
    for (let p of products) {
        items = items.concat(tableItem(p.title, p.price, p.visits))
    }
    let table = `
    <div class="col-lg-12 col-md-12 col-sm-12">
    <h3 class="box-title mt-5">Products Visits</h3>
    <div class="table-responsive">
        <table class="table table-striped table-product">
            <tbody>
                ${items}
            </tbody>
        </table>
    </div>
</div>`

    $("#sideb").html(table);
}

function getPurchasedHtml(products) {

    let items = ''
    for (let p of products) {
        items = items.concat(tableItem(p.title, p.price, p.purchased))
    }
    let table = `
    <div class="col-lg-12 col-md-12 col-sm-12">
    <h3 class="box-title mt-5">Product Purchased</h3>
    <div class="table-responsive">
        <table class="table table-striped table-product">
            <tbody>
                ${items}
            </tbody>
        </table>
    </div>
</div>`

    $("#sideb").html(table);
}

function tableItem(title, price, data) {
    return `<tr><td width="390">${title}</td><td>${price}</td><td>${data}</td></tr>`
}



