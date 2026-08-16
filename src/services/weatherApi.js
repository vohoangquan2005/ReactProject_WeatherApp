export async function searchCity(city){
    const reponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=vi&format=json`);
    const data = await reponse.json();
    return data;
}

export async function getWeather(latitude, longitude) {
  // Đây là API hiển thị thời tiết ngày hiện tại
  // const response = await fetch(
  //   `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  // );
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );
  const data = await response.json();
  return data;
}

export async function searchLocation(latitude, longitude){
  const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi`
  );
  const data = await response.json();
  return data;
}