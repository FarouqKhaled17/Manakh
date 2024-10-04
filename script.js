const API_KEY = "7d6adecc74525ea6b8a69a43ba63ecb0";
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${API_KEY}`;
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherStatus = document.querySelector('.weather-status');

async function getWeather(city) {
    const response = await fetch(`${API_URL}&q=${city}`);
    if (response.status == 404) {
        document.querySelector('.weather').style.display = "none"
        document.querySelector('.error img').style.display = "block";
    } else {
        document.querySelector('.error img').style.display = "none";
    }
    var data = await response.json();
    console.log(data.list[0].weather[0].main);

    document.querySelector('.city').innerHTML = data.city.name;
    document.querySelector('.temp').innerHTML = Math.round(data.list[0].main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.list[0].wind.speed + 'Km/h';
    
    const weatherCondition = data.list[0].weather[0].main;
    switch (weatherCondition) {
        case 'Clear':
            weatherStatus.src = "./imgs/clear.png";
            break;
        case 'Clouds':
            weatherStatus.src = "./imgs/clouds.png";
            break;
        case 'Rain':
            weatherStatus.src = "./imgs/rain.png";
            break;
        case 'Snow':
            weatherStatus.src = "./imgs/snow.png";
            break;
        case 'Thunderstorm':
            weatherStatus.src = "./imgs/thunderstorm.png";
            break;
        case 'Drizzle':
            weatherStatus.src = "./imgs/drizzle.png";
            break;
        case 'Mist':
            weatherStatus.src = "./imgs/mist.png";
            break;
        default:
            weatherStatus.src = "./imgs/default.png"; // Default icon if no match
            break;
    }
    document.querySelector('.weather').style.display = "block"
}

getWeather();

// Add event listener for search button click
searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value);
    searchBox.value = '';  // Clear input field after search
});
