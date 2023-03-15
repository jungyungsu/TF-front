import React, { useState } from 'react';
import './SearchPage.css'

function Search() {
  const [departure, setDeparture] = useState(''); // 출발지
  const [departureOptions, setDepartureOptions] = useState(['제주', '부산']); // 출발지 옵션
  const [departurePopupOpen, setDeparturePopupOpen] = useState(false); // 출발지 팝업 오픈 여부
  const [destination, setDestination] = useState(''); // 도착지
  const [departureDate, setDepartureDate] = useState(''); // 출발일
  const [returnDate, setReturnDate] = useState(''); // 귀국일
  const [travelers, setTravelers] = useState(1); // 여행자 수
  const [searchResults, setSearchResults] = useState(null); // 검색 결과

  // 여행 검색 버튼 클릭 시 검색 결과를 가져오는 함수
  const searchTravel = async () => {
    const response = await fetch(
      `https://your-travel-api.com/search?departure=${departure}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&travelers=${travelers}`
    );
    const data = await response.json();
    setSearchResults(data);
  };

  // Departure 입력 필드 클릭 시 출발지 옵션 팝업 오픈
  const handleDepartureClick = () => {
    setDeparturePopupOpen(true);
  };

  // 출발지 옵션 선택 시 해당 값이 Departure에 입력되고 팝업이 닫힘
  const handleDepartureOptionClick = (option) => {
    setDeparture(option);
    setDeparturePopupOpen(false);
  };

  return (
    <div className="travel-search">
      {/* 출발지, 도착지, 출발일, 귀국일, 여행자 수 입력 폼 */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Departure"
          value={departure}
          onClick={handleDepartureClick}
          onChange={(e) => setDeparture(e.target.value)}
        />
        {departurePopupOpen && (
          <div className="departure-popup">
            {departureOptions.map((option) => (
              <div
                key={option}
                className="departure-option"
                onClick={() => handleDepartureOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}s
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Travelers"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
        />
        <button onClick={searchTravel}>Search</button>
      </div>
      {/* 검색 결과 표시 */}
      {searchResults && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.id} className="search-result">
              <h2>{result.airline}</h2>
              <p>Departure: {result.departure}</p>
              <p>Destination: {result.destination}</p>
              <p>Departure Date: {result.departureDate}</p>
              <p>Return Date: {result.returnDate}</p>
              <p>Price: {result.price}</p>
            </div>
          ))}
        </div>
      )}
      {departurePopupOpen && (
      <div className="departure-popup">
        {departureOptions.map((option) => (
          <div key={option} className="departure-option" onClick={() => {
            setDeparture(option);
            setDeparturePopupOpen(false);
          }}>
            {option}
          </div>
        ))}
      </div>
    )}

    </div>
  );
}


export default Search;