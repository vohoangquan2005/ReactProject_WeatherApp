import { useState, useEffect } from 'react'
import './App.css'
// component
import SearchBar from "./components/SearchBar.jsx"
import Header from "./components/Header.jsx"
import CurrentWeather from "./components/CurrentWeather.jsx"
import Forecast from "./components/Forecast.jsx";
import RecentCities from "./components/RecentCities.jsx";

// API
import { searchCity, getWeather, searchLocation } from "./services/weatherApi.js";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lưu thông tin thành phố đã tìm
  const [recentCities, setRecentCities] = useState(() =>{
    const storedCities = localStorage.getItem("recentCities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  useEffect (() =>{
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities])

  // Lưu danh sách 5 thành phố đã tìm gần đây
  const saveRecentCities = (cityName) =>{
    if(!cityName) return;
    // Cái này là tạo 1 mảng mới: phần tử đầu tiên là cityName.ok hiểu rồi
    const updatedCities = [
      cityName,
      ...recentCities.filter((city) => city.toLowerCase() !== cityName.toLowerCase())
    ]
    const limitedCities = updatedCities.slice(0,5);
    setRecentCities(limitedCities);
  }

  // Handle Search
  const handleSearch = async (searchCityName = city) => {
    if (searchCityName.trim() === "") return;
    setLoading(true);
    setError("");

    try {
      const data = await searchCity(searchCityName);
      if (!data.results || data.results.length === 0) {
        setError("Không tìm thấy thành phố.");
        return;
      }
      const locationData = data.results[0];
      const latitude = locationData.latitude;     // Vĩ độ
      const longitude = locationData.longitude; // Kinh độ

      setCity(searchCityName);
      setLocation(locationData);  // Lưu thông tin thành phố
      saveRecentCities(locationData.name);

      const weatherData = await getWeather(latitude, longitude);
      setWeather(weatherData);
      console.log(weatherData);  // Đây sẽ hiển ra 1 Object thời tiết trong console để có thể lấy dữ liệu và hiển thị trong CurrentWeather
    }
    catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại!");
    }
    finally {
      setLoading(false);
    }
  }

  // Handle Select City
  const handleSelectCity = (cityName) => {
    handleSearch(cityName);
  };

  // Handle Location
  const handleLocation = () => {
    setLoading(true);
    setError("");
    // navigator.geolocation: Đây là API có sẵn trong trình duyệt
    //  getCurrentPosition(success, error) là hàm dùng để lấy vị trí hiện tại, nó nhận các callback để xử lý, ở đây là (position, error)
    // (position)=>{} là callback sẽ được thực hiện khi trình duyệt lấy vị trí thành công
    // position là Object: đại khái nó có dạng như này:
    // position = {
    //     coords: {
    //       latitude: 10.123,
    //       longitude: 106.456
    //     }
    //   }
    // do đó để lấy thông tin thì phải dùng: position.coords.latitude
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;    // coords (tọa độ): nó có thể chứa {latitude: 10.123, longitude: 106.456, accuracy: 20}
        const longitude = position.coords.longitude;

        try {
          // Tìm tên địa điểm
          const locationData = await searchLocation(latitude, longitude);
          console.log(locationData);

          const locationName = locationData.address.city ||
                locationData.address.town ||
                locationData.address.village ||
                locationData.address.municipality ||
                locationData.address.county ||
                locationData.address.state;

          setLocation({
                name: locationName,
                state: locationData.address.state,
                country: locationData.address.country
          });
          // Lấy thời tiết
          const weatherData = await getWeather(latitude, longitude);
          setWeather(weatherData);
        }
        catch (error) {
          console.log(error);
          setError("Có lỗi xảy ra. Vui lòng thử lại!")
        }
         finally {
          setLoading(false);
        }
      },
      // Nếu không chạy được thì hiển thị lỗi
      (error) => {
        console.log(error);
        setError("Không thể lấy vị trí hiện tại!");
        setLoading(false);
      }
    );
  }

  return (
    <div className="app">
      <Header />

      <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleLocation={handleLocation} 
        loading={loading}/>
      
      <RecentCities
        cities={recentCities}
        onSelect={handleSelectCity}
      />

      {loading && <p className="loading">⏳ Đang tải...</p>}

      {error && <p className="error">{error}</p>}
      <CurrentWeather
        weather={weather}
        location={location} />

      <Forecast
        weather={weather}
      />
    </div>

  )
}
export default App