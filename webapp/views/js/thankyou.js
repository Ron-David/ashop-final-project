

setTimeout(() => {
    backToHome()
}, 3000);

function backToHome() {
    $("#main").load("homepage.html");
}

$("#back").click(() => backToHome());
