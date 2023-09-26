function getChars() {
    var number = document.getElementById("numInput").value;
    var numberLength = number.length;
    if (number < 0)
        numberLength -= 1;

    console.log(numberLength)
    document.getElementById("res").innerHTML = "Your number has " + numberLength + " characters!";
    document.getElementById("details").style.display = "block";
}



function openModal() {
    var modal = document.getElementById("Modal");
    modal.style.display = "block";
    //add more counting

}

function closeModal() {
    var modal = document.getElementById("Modal");
    modal.style.display = "none";
}