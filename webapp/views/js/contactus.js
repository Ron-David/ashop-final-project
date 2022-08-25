$.ajax({
    url: '/api/address',
    success: (res) => {
        if (res) {
            $("#map").html(setMap(res))
        }
    }
});

function setMap(address) {
    const { city, street, number } = address
    const q = [city, street, number].join("-")

    return `    <div class="mapouter">
    <div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas"
            src="https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><br>
    </div>
</div>`

}