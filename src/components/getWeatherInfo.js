// File này dùng để hiển thị Icon thời tiết theo từng trạng thái 
// Hay là thao tác xử lý thuộc tính weather_code được API trả về
function getWeatherInfo(code){
    if(code===0)
        return{
            icon: "☀️",
            description: "Trời quang"
        };
    else if (code===1 || code===2)
        return{
            icon: "🌤️",
            description: "Có mây"
        };
    else if (code===3)
        return {
            icon: "☁️",
            description: "Nhiều mây",
        };
    else if (code >= 51 && code <= 67)
        return {
            icon: "🌧️",
            description: "Có mưa",
        };
    else if (code >= 71 && code <= 77) 
        return {
            icon: "❄️",
            description: "Có tuyết",
        };
    else if (code >= 80 && code <= 82)
        return {
            icon: "🌧️",
            description: "Mưa rào",
        };
    
    else if (code >= 95) 
        return {
            icon: "⛈️",
            description: "Dông",
        };
    else
        return {
            icon: "🌡️",
            description: "Không xác định",
        };
}
export default getWeatherInfo;