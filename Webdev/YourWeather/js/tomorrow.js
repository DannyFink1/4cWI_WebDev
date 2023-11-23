function changeData(data) { //NEED TO CHANGE
    getFormattedDotDate();
    console.log("Data Incoming:", data)
    const forecast_hours = data.forecast.forecastday[0].hour
    console.log("forecast", forecast_hours);
    const morning = forecast_hours[7];
    const noon = forecast_hours[12];
    const afternoon = forecast_hours[16];
    const evening = forecast_hours[20];
    console.log(morning, noon, afternoon, evening);

    document.getElementById("state").innerHTML = data.location.region;
    document.getElementById("location").innerHTML = data.location.name;
    document.getElementById("day").innerHTML = "Morgen, " + getWeekday();
    document.getElementById("date").innerHTML = getFormattedDotDate();
    document.getElementById("m-img").src = morning.condition.icon;
    document.getElementById("m-temp").innerHTML = morning.temp_c + "°";
    document.getElementById("m-text").innerHTML = morning.condition.text;
    document.getElementById("m-rain").innerHTML = morning.precip_mm + "mm/h";
    document.getElementById("m-humidity").innerHTML = morning.humidity + "%";

    document.getElementById("n-img").src = noon.condition.icon;
    document.getElementById("n-temp").innerHTML = noon.temp_c + "°";
    document.getElementById("n-text").innerHTML = noon.condition.text;
    document.getElementById("n-rain").innerHTML = noon.precip_mm + "mm/h";
    document.getElementById("n-humidity").innerHTML = noon.humidity + "%";

    document.getElementById("a-img").src = afternoon.condition.icon;
    document.getElementById("a-temp").innerHTML = afternoon.temp_c + "°";
    document.getElementById("a-text").innerHTML = afternoon.condition.text;
    document.getElementById("a-rain").innerHTML = afternoon.precip_mm + "mm/h";
    document.getElementById("a-humidity").innerHTML = afternoon.humidity + "%";

    document.getElementById("e-img").src = evening.condition.icon;
    document.getElementById("e-temp").innerHTML = evening.temp_c + "°";
    document.getElementById("e-text").innerHTML = evening.condition.text;
    document.getElementById("e-rain").innerHTML = evening.precip_mm + "mm/h";
    document.getElementById("e-humidity").innerHTML = evening.humidity + "%";
 }

function getWeekday() {
    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    return dayOfWeek;
}

function getFormattedDotDate() {
    const now = new Date();
    const day = now.getDate() +1;
    const month = now.getMonth() + 1; // Monate sind 0-basiert, deshalb +1
    const year = now.getFullYear();

    // Führende Nullen hinzufügen, falls der Tag oder der Monat einstellig ist
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
    return formattedDate;
}

function callAPIforTomorrow(value) {
    $.ajax({
        url: "http://api.weatherapi.com/v1/forecast.json?key=5fa2dd3419924cd88d871245231710&q=" + value + "&days=1",
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("tomorrow:", data);
            changeData(data);
        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function changeAutocomplete(value) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + value + "&types=(cities)&key=AIzaSyCDNX4eF425SU1-0F10-IgGMqIpdeKlnOo",
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("autocomplete", data.predictions);
            var returnString = "";
            for (var i = 0; i < data.predictions.length; i++) {
                returnString += "<div class=\"font-black hover:bg-[#616161] transition-[4s] text-[20px]\" onclick=\"readCoords(event)\" coords=" + data.predictions[i].place_id + ">" + data.predictions[i].description + "</div> <hr>";
            }
            document.getElementById("autocomplete").innerHTML = returnString;

        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function readCoords(event) {
    var selectedElement = event.target;
    var coords = selectedElement.getAttribute("coords");
    console.log("coords", coords);

    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?place_id=" + coords + "&key=AIzaSyCDNX4eF425SU1-0F10-IgGMqIpdeKlnOo",
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("geocoding", data);
            var latlon = "" + data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng;
            console.log("latlon:", latlon);
            callAPIforTomorrow(latlon);

        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

//Data change on Enter key
document.getElementById("input").addEventListener('keypress', function(event) {
    let value = document.getElementById("input").value;
    if (event.key === "Enter") {

        callAPIforTomorrow(value);
    }
    if (event.key === "?") {
        value = value.slice(0, -1);
        console.log("moin")
        changeAutocomplete(value);
    }
})

document.getElementById("searchIcon").addEventListener('click', function(event) {
    let value = document.getElementById("input").value;
    callAPIforTomorrow(value);

})

document.getElementById("input").addEventListener('click', function(event) {
    var input_div = document.getElementById("input");
    var input_style = window.getComputedStyle(input_div);
    var currentHeight = parseInt(input_style.getPropertyValue("height"), 10);
    var newTopValue = input_div.offsetTop + currentHeight + 10 + "px";

    console.log("clicked");
    document.getElementById("autocomplete").style = "display: inline";
    document.getElementById("autocomplete").style.position = "absolute";
    document.getElementById("autocomplete").style.top = newTopValue;
    console.log("value height ", newTopValue);

})

var autocompleteTimeout;

document.getElementById("input").addEventListener('blur', function(event) {
    // Verzögert das Ausblenden des autocomplete-Elements
    autocompleteTimeout = setTimeout(function() {
        console.log("blur");
        document.getElementById("autocomplete").style.display = "none"
    }, 1);
});

document.getElementById("autocomplete").addEventListener('mousedown', function(event) {
    // Verhindert das Auslösen des blur-Events und behält den Fokus im Input-Feld
    clearTimeout(autocompleteTimeout);
    event.preventDefault();
});

var menuTimeout;



document.getElementById("menubtn").addEventListener("click", function(event) {
    document.getElementById("menu").style = "right: 0; transition: right 0.3s ease-in-out;";

})

document.addEventListener("click", function(event) {
    var menu = document.getElementById("menu");
    var menubtn = document.getElementById("menubtn");

    // Überprüfen, ob das geklickte Element nicht das Menü oder das Menüsymbol ist
    if (event.target !== menu && !menu.contains(event.target) && event.target !== menubtn) {
        // Menü schließen
        menu.style = "right: -1000px; transition: right 0.5s ease-in-out;";
    }
});

document.getElementById("close-x").addEventListener("click", function(event) {
    document.getElementById("menu").style = "right: -1000px; transition: right 0.3s ease-in-out;";
})

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var e = "";
callAPIforTomorrow("Dornbirn");
for(var i = 0; i < 26; i++)
{
    for(var e = 0; e <26; e++)
    {


        console.log("hi");

    }

}

console.log(e);
console.log(e.length)