import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const destinationOptions = [
  "Paris",
  "Tokyo",
  "Bali",
  "New York",
  "London",
  "Rome",
  "Barcelona",
  "Dubai",
  "Bangkok",
  "Sydney",
  "Los Angeles",
  "Chicago",
  "Miami",
  "San Francisco",
  "Toronto",
  "Vancouver",
  "Mexico City",
  "Rio de Janeiro",
  "Sao Paulo",
  "Buenos Aires",
  "Cape Town",
  "Cairo",
  "Istanbul",
  "Moscow",
  "Athens",
  "Lisbon",
  "Madrid",
  "Amsterdam",
  "Berlin",
  "Prague",
  "Warsaw",
  "Vienna",
  "Budapest",
  "Zurich",
  "Stockholm",
  "Oslo",
  "Helsinki",
  "Copenhagen",
  "Reykjavik",
  "Dublin",
  "Edinburgh",
  "Glasgow",
  "Manchester",
  "Brussels",
  "Geneva",
  "Nice",
  "Monaco",
  "Florence",
  "Venice",
  "Milan",
  "Naples",
  "Dubrovnik",
  "Split",
  "Zagreb",
  "Ljubljana",
  "Munich",
  "Cologne",
  "Frankfurt",
  "Hamburg",
  "Seville",
  "Granada",
  "Valencia",
  "Porto",
  "Braga",
  "Beijing",
  "Shanghai",
  "Seoul",
  "Busan",
  "Jeju",
  "Taipei",
  "Hong Kong",
  "Macau",
  "Singapore",
  "Kuala Lumpur",
  "Phuket",
  "Chiang Mai",
  "Jakarta",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Doha",
  "Abu Dhabi",
  "Auckland",
  "Wellington",
  "Perth",
  "Melbourne",
  "Brisbane",
  "Gold Coast",
  "Hobart",
  "Honolulu",
];

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = destinationOptions.filter((option) =>
    option.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSuggestionClick = (value: string) => {
    setDestination(value);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut) {
      alert("Please fill out destination, check-in, and check-out dates.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate < checkInDate) {
      alert("Check-out date cannot be before check-in date.");
      return;
    }

    navigate(
      `/search?destination=${encodeURIComponent(
        destination
      )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-6 w-full max-w-4xl mx-auto z-30 relative overflow-visible">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col relative overflow-visible">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Destination
          </label>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => setShowSuggestions(true)}
            className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mt-1 shadow-md z-50 max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-indigo-100 dark:hover:bg-indigo-700 hover:text-indigo-800 dark:hover:text-white"
                >
                  <span className="block truncate font-medium text-gray-700 dark:text-gray-200">
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Check In
          </label>
          <input
            type="date"
            placeholder="MM-DD-YYYY"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="placeholder-uppercase p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Check Out
          </label>
          <input
            type="date"
            placeholder="MM-DD-YYYY"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="placeholder-uppercase p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Guests
          </label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button size="md" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
