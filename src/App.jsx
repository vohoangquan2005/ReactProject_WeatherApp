import { useState } from 'react'
import './App.css'
// component
import SearchBar from "./components/SearchBar.jsx"
import Header from "./components/Header.jsx"
import CurrentWeather from "./components/CurrentWeather.jsx"

// API
import { searchCity, getWeather } from "./services/weatherApi.js";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); 

  const handleSearch = async () =>{
    const data = await searchCity(city);
    const location = data.results[0];
    const latitude = location.latitude;     // Vĩ độ
    const longitude  = location.longitude ; // Kinh độ

    const weatherData = await getWeather(latitude, longitude);
    setWeather(weatherData);
    // console.log(weatherData);  Đây sẽ hiển ra 1 Object thời tiết trong console để có thể lấy dữ liệu và hiển thị trong CurrentWeather
  }
  return (
    <div className="app">
      <Header />

      <SearchBar 
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}/>
      
      <CurrentWeather 
          weather={weather}/>
    </div>
  )
}
export default App