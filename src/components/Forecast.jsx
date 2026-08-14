import getWeatherInfo from "./getWeatherInfo.js";

function Forecast({ weather }) {
    const formatDate = (date) => {     // Định dạng ngày
        return new Date(date).toLocaleDateString("vi-VN", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
        });
    }
    if (!weather) {
        return null;
    }
    const daily = weather.daily;
    return (
        <div className="forecast">
            <h2>Dự báo thời tiết 5 ngày tới</h2>
            <div className="forecast-list">
                {daily.time.slice(0, 5).map((date, index) => { //slice(0, 5) hiển thị phần tử từ 0 đến 5
                    const weatherInfo = getWeatherInfo(daily.weather_code[index]);
                    return (
                        <div className="forecast-card" key={date}>
                            <p className="forecast-date">{formatDate(date)}</p>

                            <div className="forecast-icon">{weatherInfo.icon}</div>

                            <p className="forecast-description">{weatherInfo.description}</p>

                            <p className="forecast-temp">Max: {daily.temperature_2m_max[index]}°C</p>

                            <p className="forecast-min-temp">Min: {daily.temperature_2m_min[index]}°C</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Forecast;