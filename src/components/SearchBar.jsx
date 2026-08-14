function SearchBar({city, setCity, handleSearch}){
    const handleKeyDown = (e) =>{
        if(e.key === "Enter") handleSearch();
    }
    return(
        <div className="search-bar">
            <input type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown = {handleKeyDown}
                    placeholder="Nhập tên thành phố..." />
            <button onClick={handleSearch}>🔍</button>
        </div>
    )
}
export default SearchBar;