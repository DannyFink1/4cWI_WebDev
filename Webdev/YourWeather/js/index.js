//Startup
callAPIforCurrent("Dornbirn");
getHourDetails("Dornbirn");


function changeData(data) {
    getFormattedDotDate();
    console.log("Data Incoming:", data)
    const location = data.location;
    const current = data.current;
    const weekday = ["So", "Mo", "Di", "Wednesday", "Thursday", "Friday", "Saturday"];

    document.getElementById("state").innerHTML = location.region;
    document.getElementById("location").innerHTML = location.name;
    document.getElementById("currentTemp").innerHTML = current.temp_c + "°";
    document.getElementById("rain").innerHTML = "Niederschlag: " + current.precip_mm + " mm/h";
    document.getElementById("wind").innerHTML = "Wind: " + current.wind_kph + " km/h";
    document.getElementById("humidity").innerHTML = "Luftfeuchtigkeit: " + current.humidity + "%"
    document.getElementById("day").innerHTML = "Heute, " + getWeekday();
    document.getElementById("date").innerHTML = getFormattedDotDate();
    document.getElementById("condition_text").innerHTML = current.condition.text;
    document.getElementById("condition_img").src = current.condition.icon;
}


function getWeekday() {
    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    return dayOfWeek;
}

function getFormattedDotDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Monate sind 0-basiert, deshalb +1
    const year = now.getFullYear();

    // Führende Nullen hinzufügen, falls der Tag oder der Monat einstellig ist
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
}

function getFormattedMinusDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Monate sind 0-basiert, deshalb +1
    const year = now.getFullYear();

    // Führende Nullen hinzufügen, falls der Tag oder der Monat einstellig ist
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
}

function getHourDetails(value) {
    $.ajax({
        url: "http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=" + value + "&dt=" + getFormattedMinusDate(),
        // url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=schwende&types=(cities)&key=AIzaSyCDNX4eF425SU1-0F10-IgGMqIpdeKlnOo",
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("history", data)
            var returnString = "";
            //addition to main panel
            var temperature = data.forecast.forecastday[0].hour.map(function(hour) { return hour.temp_c });
            document.getElementById("tempPrediction").innerHTML = (Math.min(...temperature)) + "°/" + (Math.max(...temperature)) + "°"; //need to figure our a way

            for (var i = 0; i < 24; i++) {
                var temp = data.forecast.forecastday[0].hour[i].temp_c;
                var icon = data.forecast.forecastday[0].hour[i].condition.icon;
                var humidity = data.forecast.forecastday[0].hour[i].humidity;
                returnString += " <div class=\" h-[100px] w-[90px] bg-[#8ECAE6] border-sold border-[1px] border-[#023047] rounded-[2px] ml-4 mr-4 flex flex-col items-center\"> <div class=\"time text-[13px]\"> " + i + " Uhr</div> <div class=\"hour-temp font-semibold\">" + temp + "°</div> <div class=\"hour-img\"> <img src=" + icon + " width=\"40px\"></div> <div class=\"hour-humidity text-[9px]\">" + humidity + "%</div></div>";
            }
            document.getElementById("hour_details").innerHTML = returnString;

        },
        error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });


}

// function callAPIforHours(value)
// {
//   $.ajax({
//     url: "http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=" + value + "&dt=" + getFormattedMinusDate(),
//     dataType: 'json',
//     success: function (data) {
//       var dataAsText = JSON.stringify(data);
//       console.log("history", data)
//       return data;
//     },
//     error: function (xmlHttpRequest, textStatus, errorThrown) {
//       console.log(textStatus, errorThrown);
//     }
//   });
// }

function callAPIforCurrent(value) {
    $.ajax({
        url: "https://api.weatherapi.com/v1/current.json?&key=5fa2dd3419924cd88d871245231710&q=" + value,
        dataType: 'json',
        success: function(data) {
            var dataAsText = JSON.stringify(data);
            console.log("current", data);
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
            callAPIforCurrent(latlon);
            getHourDetails(latlon);

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

        callAPIforCurrent(value);
        getHourDetails(value);
    }
    if (event.key === "?") {
        value = value.slice(0, -1);
        changeAutocomplete(value);
    }
})

document.getElementById("searchIcon").addEventListener('click', function(event) {
    let value = document.getElementById("input").value;
    callAPIforCurrent(value);
    getHourDetails(value);
})

document.getElementById("input").addEventListener('click', function(event) {
    console.log("clicked");
    document.getElementById("autocomplete").style = "display:inline";

})

var autocompleteTimeout;

document.getElementById("input").addEventListener('blur', function(event) {
    // Verzögert das Ausblenden des autocomplete-Elements
    autocompleteTimeout = setTimeout(function() {
        console.log("blur");

        document.getElementById("autocomplete").style.display = "display: none";
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