const cityContainer = document.getElementById('city')
const weatherPic = document.getElementById('weatherImage')
const tempContainer = document.getElementById('temp')
const descriptionContainer = document.getElementById('description')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    cityContainer.innerHTML = json.name
    tempContainer.innerHTML = `${json.main.temp.toFixed(1)}&#730`
    descriptionContainer.innerHTML = json.weather[0].description

    const weatherId = json.weather[0].id
    let weatherIcon

    if (weatherId === 800 && dayTime) {
      weatherIcon = `<img src"./assets/039-sun.png">` //Clear day sun
    } else if (weatherId === 800 && !dayTime) {
      weatherIcon = `<img src="./assets/024-night-4.png">` //Clear night moon
    } else if (weatherId === 801 && dayTime) {
      weatherIcon = `<img src="./assets/038-cloudy-3.png">` //Few clouds day
    } else if (weatherId === 801 && !dayTime) {
      weatherIcon = `<img src="./assets/002-cloud-1.png">` //Few clouds night
    } else if (weatherId === 802) {
      weatherIcon = `<img src="./assets/011-cloudy.png">` //Scattered clouds
    } else if (weatherId === 803 || weatherId === 804) {
      weatherIcon = `<img src="./assets/001-cloud.png">` //Broken or overcast clouds
    } else if (weatherId >= 700 && weatherId < 800) {
      weatherIcon = `<img src="./assets/017-foog.png">` //Atmosphere mist, dust, fog etc.
    } else if (weatherId >= 600 && weatherId < 700) {
      weatherIcon = `<img src="./assets/006-snowy.png">` //Snow
    } else if (weatherId >= 300 && weatherId < 600) {
      weatherIcon = `<img src="./assets/003-rainy.png">` //Rain
    } else if (weatherId >= 200 && weatherId < 300) {
      weatherIcon = `<img src="./assets/045-thunder.png">` //Thunderstorm
    }

    weatherPic.innerHTML = `${weatherIcon}`


    const sunriseConversion = new Date(json.sys.sunrise * 1000)
    const sunsetConversion = new Date(json.sys.sunset * 1000)

    const sunriseTime = sunriseConversion.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunsetConversion.toLocaleTimeString([], { timeStyle: 'short' })

    sunriseContainer.innerHTML += sunriseTime
    sunsetContainer.innerHTML += sunsetTime
  })

  .catch((err) => {
    console.log("caught error", err)
  })

const forecastContainer = document.getElementById('forecast')

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {

    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

    filteredForecast.forEach((day) => {
      const date = new Date(day.dt * 1000)
      const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      let dayOfWeek = weekdays[date.getDay()];

      forecastContainer.innerHTML += `<section class="dayForecast"><h2>${dayOfWeek}</h2><p>${day.main.temp.toFixed(1)}&#730</p></section>`
    })
  })

  .catch((err) => {
    console.log("caught error", err)
  })

