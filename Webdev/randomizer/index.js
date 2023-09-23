function generate() {
    let res, min, max, diff;

    min = document.getElementById("min").value;
    max = document.getElementById("max").value;
    diff = parseInt(max) - parseInt(min);

    if (diff > 0) {
        res = Math.floor(Math.random() * diff) + parseInt(min);
        console.log(res);
        document.getElementById("res").innerHTML = "Die zufällige Zahl lautet: " + res;
    }

}