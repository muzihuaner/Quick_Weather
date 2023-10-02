let cel = true;

// Date
function getTodayDate() {
  const tdate = new Date();
  const dd = tdate.getDate(); //day
  const MM = tdate.getMonth(); //month
  const yyyy = tdate.getFullYear(); //year
  const todayDate = dd + "-" + (MM + 1) + "-" + yyyy;
  document.getElementById("currentDate").innerHTML = todayDate;
}

// Get Location - city, lat, lon
function getLocation() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://ipinfo.io/geo", true);

  xhr.onload = function () {
    if (this.status == 200) {
      const userLocation = JSON.parse(this.responseText);
      const userCity = userLocation.city;
      const getUserLocation = userLocation.loc.split(",");
      const userLat = getUserLocation[0];
      const userLon = getUserLocation[1];
      const img = document.getElementById("7timer");
      img.src = 'https://www.7timer.info/bin/civillight.php?lon=' + userLon + '&lat=' + userLat + '&lang=zh-CN&ac=0&unit=metric&tzshift=0'
      // Current Weather
      function getWeatherData() {
        const API_KEY = "7a6fb46593b2eb27b5c12d3e169f7c87";
        const xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          userLat +
          "&lon=" +
          userLon +
          "&units=metric&lang=en" +
          "&APPID=" +
          API_KEY,
          true
        );
        xhr.onload = function () {
          if (this.status == 200) {
            const userWeather = JSON.parse(this.responseText);
            const currentTemperature = userWeather.main.temp;

            //Show user's city
            if (userLocation) {
              document.getElementById("currentLocation").innerHTML =
                userCity;
            } else {
              document.getElementById("currentLocation").innerHTML =
                "未知地区";
            }

            // Show weather data
            document.getElementById("currentWeather").innerHTML =
              userWeather.weather[0].description;
            document.getElementById("currentTemp").innerHTML =
              userWeather.main.temp + " &#176;C";
            document.getElementById("high-low").innerHTML =
              userWeather.main.temp_max +
              " &#176;C" +
              " / " +
              userWeather.main.temp_min +
              " &#176;C";
            document.getElementById("cloud").innerHTML =
              userWeather.clouds.all + "%";
            document.getElementById("wind").innerHTML =
              userWeather.wind.speed + " m/sec";
            document.getElementById("humidity").innerHTML =
              userWeather.main.humidity + "%";
            document.getElementById("pressure").innerHTML =
              userWeather.main.pressure + " hPa";

            // 获取 HTML 元素
            var sunriseElement = document.getElementById("sunrise");
            var sunsetElement = document.getElementById("sunset");

            // 转换并显示日出时间（UTC）
            var sunriseDate = new Date(userWeather.sys.sunrise * 1000);
            var sunriseTimeUTC = sunriseDate.toUTCString();
            var sunriseTime = new Date(sunriseTimeUTC).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
            sunriseElement.innerHTML = sunriseTime;

            // 转换并显示日落时间（UTC）
            var sunsetDate = new Date(userWeather.sys.sunset * 1000);
            var sunsetTimeUTC = sunsetDate.toUTCString();
            var sunsetTime = new Date(sunsetTimeUTC).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
            sunsetElement.innerHTML = sunsetTime;



            // Show weather icon
            const hours = new Date().getHours();
            const dayOrNight = hours > 6 && hours < 22 ? "day" : "night";
            const icon2 = userWeather.weather[0].id;
            document
              .getElementById("forecast")
              .firstChild.classList.add("wi-owm-" + dayOrNight + "-" + icon2);

            // C to F
            document
              .getElementsByClassName("slider")[0]
              .addEventListener("click", function () {
                if (cel) {
                  const f = (userWeather.main.temp * 9 / 5 + 32).toFixed(2);
                  const fMin = (userWeather.main.temp_min * 9 / 5 + 32).toFixed(
                    2
                  );
                  const fMax = (userWeather.main.temp_max * 9 / 5 + 32).toFixed(
                    2
                  );
                  cel = !cel;
                  document.getElementById("currentTemp").innerHTML =
                    f + " &#176;F";
                  document.getElementById("high-low").innerHTML =
                    fMax + " &#176;F" + " / " + fMin + " &#176;F";
                } else {
                  document.getElementById("currentTemp").innerHTML =
                    userWeather.main.temp + " &#176;C";
                  document.getElementById("high-low").innerHTML =
                    userWeather.main.temp_max +
                    " &#176;C" +
                    " / " +
                    userWeather.main.temp_min +
                    " &#176;C";
                  cel = true;
                }
              });
          }
        };
        xhr.send();
      }

      getWeatherData();
    }
  };
  xhr.send();
}
getLocation();
getTodayDate();



function getmyWeatherData(location) {
  let cel = true; // 初始化 cel 变量为 true
  const API_KEY = "7a6fb46593b2eb27b5c12d3e169f7c87";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(location) +
    "&units=metric&lang=en" +
    "&APPID=" +
    API_KEY;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 在这里处理获取到的天气数据
      console.log(data);
      const userWeather = data
      //Show user's city
      if (data.name) {
        document.getElementById("currentLocation").innerHTML = data.name;
      } else {
        document.getElementById("currentLocation").innerHTML =
          "未知地区";
      }

      // Show weather data
      document.getElementById("currentWeather").innerHTML =
        userWeather.weather[0].description;
      document.getElementById("currentTemp").innerHTML =
        userWeather.main.temp + " &#176;C";
      document.getElementById("high-low").innerHTML =
        userWeather.main.temp_max +
        " &#176;C" +
        " / " +
        userWeather.main.temp_min +
        " &#176;C";
      document.getElementById("cloud").innerHTML =
        userWeather.clouds.all + "%";
      document.getElementById("wind").innerHTML =
        userWeather.wind.speed + " m/sec";
      document.getElementById("humidity").innerHTML =
        userWeather.main.humidity + "%";
      document.getElementById("pressure").innerHTML =
        userWeather.main.pressure + " hPa";
      // 获取 HTML 元素
      var sunriseElement = document.getElementById("sunrise");
      var sunsetElement = document.getElementById("sunset");

      // 转换并显示日出时间（UTC）
      var sunriseDate = new Date(userWeather.sys.sunrise * 1000);
      var sunriseTimeUTC = sunriseDate.toUTCString();
      var sunriseTime = new Date(sunriseTimeUTC).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
      sunriseElement.innerHTML = sunriseTime;

      // 转换并显示日落时间（UTC）
      var sunsetDate = new Date(userWeather.sys.sunset * 1000);
      var sunsetTimeUTC = sunsetDate.toUTCString();
      var sunsetTime = new Date(sunsetTimeUTC).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
      sunsetElement.innerHTML = sunsetTime;
      // Show weather icon
      const hours = new Date().getHours();
      const dayOrNight = hours > 6 && hours < 22 ? "day" : "night";
      const icon2 = userWeather.weather[0].id;
      document
        .getElementById("forecast")
        .firstChild.classList.add("wi-owm-" + dayOrNight + "-" + icon2);

      // C to F
      document
        .getElementsByClassName("slider")[0]
        .addEventListener("click", function () {
          if (cel) {
            const f = (userWeather.main.temp * 9 / 5 + 32).toFixed(2);
            const fMin = (userWeather.main.temp_min * 9 / 5 + 32).toFixed(
              2
            );
            const fMax = (userWeather.main.temp_max * 9 / 5 + 32).toFixed(
              2
            );
            cel = !cel;
            document.getElementById("currentTemp").innerHTML =
              f + " &#176;F";
            document.getElementById("high-low").innerHTML =
              fMax + " &#176;F" + " / " + fMin + " &#176;F";
          } else {
            document.getElementById("currentTemp").innerHTML =
              userWeather.main.temp + " &#176;C";
            document.getElementById("high-low").innerHTML =
              userWeather.main.temp_max +
              " &#176;C" +
              " / " +
              userWeather.main.temp_min +
              " &#176;C";
            cel = true;
          }
        });

    })
    .catch(error => {
      // 处理错误
      console.error('Error:', error);
    });
}