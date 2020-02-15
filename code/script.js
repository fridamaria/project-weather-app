const cityContainer = document.getElementById('city')
const tempContainer = document.getElementById('temp')
const descriptionContainer = document.getElementById('description')
const sunriseContainer = document.getElementById('sunrise')
const sunsetContainer = document.getElementById('sunset')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=60032cdd91d77852bfb39762c09118fe')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    cityContainer.innerHTML = json.name
    tempContainer.innerHTML = `${json.main.temp.toFixed(1)} °`
    descriptionContainer.innerHTML = json.weather[0].description

    const sunriseConversion = new Date(json.sys.sunrise * 1000)
    const sunsetConversion = new Date(json.sys.sunset * 1000)

    const sunriseTime = sunriseConversion.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunsetConversion.toLocaleTimeString([], { timeStyle: 'short' })

    sunriseContainer.innerHTML = `Sunrise: ${sunriseTime}`
    sunsetContainer.innerHTML = `Sunset: ${sunsetTime}`
  })