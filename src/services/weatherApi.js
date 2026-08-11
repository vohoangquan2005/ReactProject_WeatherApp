export async function searchCity(city){
    const reponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=vi&format=json`);
    const data = await reponse.json();
    return data;
}

export async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  const data = await response.json();

  return data;
}