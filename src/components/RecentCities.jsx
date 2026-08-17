function RecentCities({ cities, onSelect, onDelete }) {
  if (cities.length === 0) return null;
  return (
    <div className="recent-cities">
      <h3>🕘 Thành phố gần đây</h3>
      <div className="recent-list">
        {cities.map((city) => (
          <div className="recent-city">
            <button className="city-button" key={city}
                    onClick={() => onSelect(city)}> {city} </button>
            <button className="delete-button"
                    onClick={() => onDelete(city)}> x </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RecentCities;