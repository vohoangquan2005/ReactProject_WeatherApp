function SearchBar({city, setCity, handleSearch}){
    return(
        <div className="search-bar">
            <input type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Nhập tên thành phố..." />
            <button onClick={handleSearch}>🔍</button>
        </div>
    )
}
export default SearchBar;