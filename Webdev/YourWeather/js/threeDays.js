function changeData(data) { //NEED TO CHANGE


    const forecastday = data.forecast.forecastday;
    const day1 = forecastday[0].day;
    const day2 = forecastday[1].day;
    const day3 = forecastday[2].day;
    console.log(day1, day2, day3);

    document.getElementById("state").innerHTML = data.location.region;
    document.getElementById("location").innerHTML = data.location.name;
    document.getElementById("date").innerHTML = getFormattedDateRange();

    //document.getElementById("1-day").innerHTML = morning.;
    document.getElementById("1-day").innerHTML = berechneDatum(0);
    document.getElementById("1-img").src = day1.condition.icon;
    document.getElementById("1-temp").innerHTML = day1.avgtemp_c + "°";
    document.getElementById("1-text").innerHTML = day1.condition.text;
    document.getElementById("1-rain").innerHTML = day1.totalprecip_mm + "mm/h";
    document.getElementById("1-humidity").innerHTML = day1.avghumidity + "%";

    //document.getElementById("2-day").innerHTML = noon.;
    document.getElementById("2-day").innerHTML = berechneDatum(1);
    document.getElementById("2-img").src = day2.condition.icon;
    document.getElementById("2-temp").innerHTML = day2.avgtemp_c + "°";
    document.getElementById("2-text").innerHTML = day2.condition.text;
    document.getElementById("2-rain").innerHTML = day2.totalprecip_mm + "mm/h";
    document.getElementById("2-humidity").innerHTML = day2.avghumidity + "%";

    //document.getElementById("3-day").innerHTML = afternoon.;
    document.getElementById("3-day").innerHTML = berechneDatum(2);
    document.getElementById("3-img").src = day3.condition.icon;
    document.getElementById("3-temp").innerHTML = day3.avgtemp_c + "°";
    document.getElementById("3-text").innerHTML = day3.condition.text;
    document.getElementById("3-rain").innerHTML = day3.totalprecip_mm + "mm/h";
    document.getElementById("3-humidity").innerHTML = day3.avghumidity + "%";
 }

function getWeekday() {
    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    return dayOfWeek;
}

function berechneDatum(offset) {
  const heute = new Date();
  heute.setDate(heute.getDate() + offset);

  const tage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const wochentag = tage[heute.getDay()];

  const tag = heute.getDate();
  const monat = heute.getMonth() + 1; // Monate beginnen mit 0

  const datum = `${wochentag}, ${tag}.${monat}`;

  return datum;
}

function getFormattedDateRange() {
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);

    // Set the start date to tomorrow
    startDate.setDate(today.getDate());

    // Set the end date to three days from tomorrow
    endDate.setDate(startDate.getDate() + 2);

    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth() + 1; // Months are zero-based
    const startYear = startDate.getFullYear();

    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1; // Months are zero-based
    const endYear = endDate.getFullYear();

    // Format start date
    const formattedStartDay = startDay < 10 ? "0" + startDay : startDay;
    const formattedStartMonth = startMonth < 10 ? "0" + startMonth : startMonth;

    // Format end date
    const formattedEndDay = endDay < 10 ? "0" + endDay : endDay;
    const formattedEndMonth = endMonth < 10 ? "0" + endMonth : endMonth;

    const formattedDateRange = `${formattedStartDay}-${formattedEndDay}.${formattedStartMonth}.${startYear}`;

    return formattedDateRange;
}

function callAPIforThree(value) {
    $.ajax({
        url: "http://api.weatherapi.com/v1/forecast.json?key=5fa2dd3419924cd88d871245231710&q=" + value + "&days=3",
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("three days2:", data);
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
            callAPIforThree(latlon);

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

        callAPIforThree(value);
    }
    if (event.key === "?") {
        value = value.slice(0, -1);
        console.log("moin")
        changeAutocomplete(value);
    }
})

document.getElementById("searchIcon").addEventListener('click', function(event) {
    let value = document.getElementById("input").value;
    callAPIforThree(value);

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

callAPIforThree("Dornbirn");

