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

callAPIforTomorrow("Dornbirn");