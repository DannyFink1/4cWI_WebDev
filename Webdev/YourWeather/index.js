
 $.ajax({

  url: "https://api.weatherapi.com/v1/current.json?key=5fa2dd3419924cd88d871245231710&q=Dornbirn",

  dataType: 'json',

  success: function(data) {

   var dataAsText = JSON.stringify(data);
  changeData(data);



 },

  error: function (xmlHttpRequest, textStatus, errorThrown) {

        console.log(textStatus, errorThrown);

 }});



  function changeData(data) {
    console.log(data)
    const location = data.location;
    const current = data.current;
    document.getElementById("state").innerHTML = location.region;
    document.getElementById("location").innerHTML = location.name;
    document.getElementById("currentTemp").innerHTML = current.temp_c + "°";
    document.getElementById("tempPrediction").innerHTML = (current.temp_c -2) + "°/" + (current.temp_c +2); //need to figure our a way
    document.getElementById("rain").innerHTML = "Niederschlag: " + current.precip_mm + " mm/h";
    document.getElementById("wind").innerHTML = "Wind: " + current.wind_kph + " km/h";
    document.getElementById("humidity").innerHTML = "Luftfeuchtigkeit: " + current.humidity + "%";
  }







 

