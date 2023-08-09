const searchInput = document.getElementById("input");
const findBtn = document.getElementById("find");
const cityN = document.getElementById("city");
const temp = document.getElementById("num");
const icon = document.getElementById("icon");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const speed = document.getElementById("speed");
const direction = document.getElementById("direction");
const icon2 = document.getElementById("icon2");
const day_temp2 = document.getElementById("day-temp2");
const night_temp2 = document.getElementById("night-temp2");
const desc2 = document.getElementById("desc2");
const icon3 = document.getElementById("icon3");
const day_temp3 = document.getElementById("day-temp3");
const night_temp3 = document.getElementById("night-temp3");
const desc3 = document.getElementById("desc3");
const day = document.getElementById("day");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const date = document.getElementById("date");
const invalid = document.getElementById("invalid");
/// Get the current date
const currentDate = new Date();
// Calculate the date of tomorrow
const tomorrow = new Date(currentDate);
tomorrow.setDate(currentDate.getDate() + 1);

// Calculate the date of the day after tomorrow
const dayAfterTomorrow = new Date(currentDate);
dayAfterTomorrow.setDate(currentDate.getDate() + 2);

// Define an array of day names
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const todayDayOfWeekIndex = currentDate.getDay();
const tomorrowDayOfWeekIndex = tomorrow.getDay();
const dayAfterTomorrowDayOfWeekIndex = dayAfterTomorrow.getDay();

// Get the day names using the indexes
const todayDayName = daysOfWeek[todayDayOfWeekIndex];
const tomorrowDayName = daysOfWeek[tomorrowDayOfWeekIndex];
const dayAfterTomorrowDayName = daysOfWeek[dayAfterTomorrowDayOfWeekIndex];
const todayDay = currentDate.getDate();
const todayMonthIndex = currentDate.getMonth();
const todayMonthName = monthsOfYear[todayMonthIndex];
// Check for Geolocation support
if ("geolocation" in navigator) {
  // Request user's location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      request(latitude, longitude);
    },
    function (error) {
      console.error("Error getting location:", error.message);
    }
  );
} else {
  console.log("Geolocation is not available in this browser");
}

findBtn.addEventListener("click", function () {
  var searchV = searchInput.value;
  request(searchV);
});

async function request(cityorlat, lon = "") {
  if (lon == "") {
    var req = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=0be2c733158c4be989455056230408&q=${cityorlat}&aqi=no`
    );
    var res = await req.json();
    var req2 = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=0be2c733158c4be989455056230408&q=${cityorlat}&days=3&aqi=no&alerts=no`
    );
  } else {
    var req = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=0be2c733158c4be989455056230408&q=${cityorlat},${lon}&aqi=no`
    );
    var res = await req.json();
    var req2 = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=0be2c733158c4be989455056230408&q=${cityorlat},${lon}&days=3&aqi=no&alerts=no`
    );
  }
  var res2 = await req2.json();
  if (req.status == 400 || req2.status == 400) {
    invalid.style.display = "block";
  } else {
    console.log(res, res2);
    cityN.innerHTML = res.location.name;
    temp.innerHTML = `${res.current.temp_c}<sup>o</sup>C`;
    icon.src = `https:${res.current.condition.icon}`;
    desc.innerHTML = res.current.condition.text;
    humidity.innerHTML = `<i class="fa-solid fa-umbrella text-white-50 px-1"></i> ${res.current.humidity}%`;
    speed.innerHTML = `<i class="fa-solid fa-wind text-white-50 px-1"></i> ${res.current.wind_kph}km/h`;
    direction.innerHTML = `<i class="fa-regular fa-compass text-white-50 px-1"></i> ${res.current.wind_dir}`;
    icon2.src = `https:${res2.forecast.forecastday[1].day.condition.icon}`;
    day_temp2.innerHTML = `${res2.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    night_temp2.innerHTML = `${res2.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
    desc2.innerHTML = res2.forecast.forecastday[1].day.condition.text;
    icon3.src = `https:${res2.forecast.forecastday[2].day.condition.icon}`;
    day_temp3.innerHTML = `${res2.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    night_temp3.innerHTML = `${res2.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
    desc3.innerHTML = res2.forecast.forecastday[2].day.condition.text;
    day.innerHTML = todayDayName;
    day2.innerHTML = tomorrowDayName;
    day3.innerHTML = dayAfterTomorrowDayName;
    date.innerHTML = todayDay + todayMonthName;
  }
}
searchInput.addEventListener("focus", function () {
  invalid.style.display = "none";
});
