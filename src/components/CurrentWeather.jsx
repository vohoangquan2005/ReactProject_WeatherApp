// HIỂN THỊ DỮ LIỆU THỜI TIẾT HIỆN TẠI

function CurrentWeather({weather}){
    return(
        <div className="current-weather">
            {weather && 
            <div>
                <h2>Thời tiết hiện tại</h2>
                <p>Nhiệt độ: {weather.current.temperature_2m}°C</p>     {/* Dùng console.log(weatherData) trong handleSearch của App.jsx sẽ hiển thị ra những thông tin này trong object */}
                <p>Độ ẩm: {weather.current.relative_humidity_2m}%</p>
                <p>Tốc độ gió: {weather.current.wind_speed_10m} km/h</p>
            </div>}
        </div>
    )
}
export default CurrentWeather;