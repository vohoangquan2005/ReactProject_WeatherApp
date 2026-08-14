import { useState } from 'react'
import './App.css'
// component
import SearchBar from "./components/SearchBar.jsx"
import Header from "./components/Header.jsx"
import CurrentWeather from "./components/CurrentWeather.jsx"
import Forecast from "./components/Forecast.jsx";

// API
import { searchCity, getWeather } from "./services/weatherApi.js";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); 
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () =>{
    if (city.trim() === "") return;
    setLoading(true);
    setError("");

    try{
      const data = await searchCity(city);
      if (!data.results || data.results.length === 0) {
        setError("Không tìm thấy thành phố.");
        return;
      }
      const locationData = data.results[0];
      const latitude = locationData.latitude;     // Vĩ độ
      const longitude  = locationData.longitude ; // Kinh độ
      setLocation(locationData);  // Lưu thông tin thành phố

      const weatherData = await getWeather(latitude, longitude);
      setWeather(weatherData);
      console.log(weatherData);  // Đây sẽ hiển ra 1 Object thời tiết trong console để có thể lấy dữ liệu và hiển thị trong CurrentWeather
    
    }
    catch(error){
      setError("Có lỗi xảy ra. Vui lòng thử lại!");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="app">
      <Header />

      <SearchBar 
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}/>

      {loading && <p className="loading">Đang tải...</p>}

      {error && <p className="error">{error}</p>}
      <CurrentWeather 
          weather={weather}
          location={location}/>

      <Forecast
        weather={weather}
      />
    </div>
    
  )
}
export default App