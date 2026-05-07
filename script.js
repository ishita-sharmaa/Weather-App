const apiKey = "3f6eac8548985367ed3b9825bedf6e92";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");

function setBackground(weatherMain) {
  const gradients = {
    Clear: "linear-gradient(135deg, #f97316, #fb923c, #38bdf8)",
    Clouds: "linear-gradient(135deg, #374151, #6b7280, #9ca3af)",
    Rain: "linear-gradient(135deg, #0f172a, #1e3a8a, #334155)",
    Drizzle: "linear-gradient(135deg, #1e3a8a, #334155, #475569)",
    Thunderstorm: "linear-gradient(135deg, #0f172a, #1f2937, #374151)",
    Snow: "linear-gradient(135deg, #e0f2fe, #bae6fd, #7dd3fc)",
    Mist: "linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)",
    Haze: "linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)",
  };
  document.body.style.background = gradients[weatherMain] || "linear-gradient(135deg, #0f172a, #1e3a8a, #38bdf8)";
}

async function getWeather(city) {
  try {
    errorMsg.textContent = "";
    weatherInfo.style.display = "none";
    searchBtn.textContent = "Loading...";
    searchBtn.disabled = true;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found. Please check the spelling.");

    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    pressure.textContent = `${data.main.pressure} hPa`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const today = new Date();
    date.textContent = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    setBackground(data.weather[0].main);
    weatherInfo.style.display = "block";
    setTimeout(() => weatherInfo.style.opacity = "1", 10);

  } catch (error) {
    errorMsg.textContent = error.message;
  } finally {
    searchBtn.textContent = "Search";
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

getWeather("Delhi");