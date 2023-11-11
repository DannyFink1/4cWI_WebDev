
 $.ajax({

  url: "https://api.weatherapi.com/v1/current.json?key=5fa2dd3419924cd88d871245231710&q=Dornbirn",

  dataType: 'json',

  success: function (data) {

    var dataAsText = JSON.stringify(data);
    changeData(data);



  },

  error: function (xmlHttpRequest, textStatus, errorThrown) {

    console.log(textStatus, errorThrown);

  }
});



function changeData(data) {
  getFormattedDotDate();
  console.log("Data Incoming:", data)
  const location = data.location;
  const current = data.current;
  const weekday = ["So", "Mo", "Di", "Wednesday", "Thursday", "Friday", "Saturday"];

  document.getElementById("state").innerHTML = location.region;
  document.getElementById("location").innerHTML = location.name;
  document.getElementById("currentTemp").innerHTML = current.temp_c + "°";
  document.getElementById("tempPrediction").innerHTML = (current.temp_c - 2) + "°/" + (current.temp_c + 2) + "°"; //need to figure our a way
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
  
  function getHourDetails(value){
    $.ajax({
      url: "http://api.weatherapi.com/v1/history.json?key=5fa2dd3419924cd88d871245231710&q=" + value + "&dt=" + getFormattedMinusDate(),
      dataType: 'json',
      success: function (data) {
        var dataAsText = JSON.stringify(data);
        console.log("history", data)

        var returnString = "";
        for(var i = 0; i < 24; i++)
        {
          var temp = data.forecast.forecastday[0].hour[i].temp_c;
          var icon = data.forecast.forecastday[0].hour[i].condition.icon;
          var humidity = data.forecast.forecastday[0].hour[i].humidity;
          returnString += " <div class=\" h-[100px] w-[90px] bg-[#8ECAE6] border-sold border-[1px] border-[#023047] rounded-[2px] ml-4 mr-4 flex flex-col items-center\"> <div class=\"time text-[13px]\"> " + i + " Uhr</div> <div class=\"hour-temp font-semibold\">" + temp + "°</div> <div class=\"hour-img\"> <img src=" + icon +" width=\"40px\"></div> <div class=\"hour-humidity text-[9px]\">" + humidity +"%</div></div>";
        }
        document.getElementById("hour_details").innerHTML = returnString;

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
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

  function callAPIforCurrent(value)
  {
    $.ajax({
      url: "https://api.weatherapi.com/v1/current.json?key=5fa2dd3419924cd88d871245231710&q=" + value,
      dataType: 'json',
      success: function (data) {
        var dataAsText = JSON.stringify(data);
        console.log("current",data);
        changeData(data);

      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });

  }

  //Main Process
  document.getElementById("input").onchange = function main() {
    let value = document.getElementById("input").value;
    var fetchVal;
    callAPIforCurrent(value); 
    getHourDetails(value);


  }