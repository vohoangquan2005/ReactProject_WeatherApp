function SearchBar({city, setCity, handleSearch, handleLocation, loading}){
    const handleKeyDown = (e) =>{
        if(e.key === "Enter") handleSearch();
    }
    return(
        <>
            <div className="search-bar">
                <input type="text" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown = {handleKeyDown}
                        placeholder="Nhập tên thành phố..." />
                <button onClick={() => handleSearch()} disabled={loading}>🔍</button>
            </div>
            <button className="current-location" 
                    onClick={handleLocation}
                    disabled={loading}>📍 Vị trí hiện tại</button>
        </>
    )
}
export default SearchBar;