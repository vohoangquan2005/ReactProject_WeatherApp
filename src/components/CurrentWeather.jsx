// HIỂN THỊ DỮ LIỆU THỜI TIẾT HIỆN TẠI
import getWeatherInfo from "./getWeatherInfo.js"
function CurrentWeather({weather, location}){
    if (!weather || !location) {
        return null;
    }
    const weatherInfo = getWeatherInfo(weather.current.weather_code);
    return(
        <div className="current-weather">
            <h1>Hôm nay</h1>
            <div>
                <h2>{location.name}, {location.state}</h2>
                <div className="weather-icon">{weatherInfo.icon}</div>
                <p className="description">{weatherInfo.description}</p>
{/* Dùng console.log(weatherData) trong handleSearch của App.jsx sẽ hiển thị ra những thông tin nhiệt độ, độ ẩm, tốc độ gió trong object */}
                <p className="temperature">{weather.current.temperature_2m}°C</p>    
                <p>💧 Độ ẩm: {weather.current.relative_humidity_2m}%</p>
                <p>💨 Tốc độ gió: {weather.current.wind_speed_10m} km/h</p>
            </div>
        </div>
    )
}
export default CurrentWeather;