import React, { useState } from "react";
import Button from "./Button";
import "../styles/components/AutoInput.style.scss";

interface AutoInput {
  suggestions: string[];
  onSearch: (searchTerm: string) => void;
}

const AutoInput: React.FC<AutoInput> = ({ suggestions, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleClear = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="autocomplete-input">
      <div className="auto-input">
        <input
          type="text"
          required
          value={inputValue}
          placeholder="Search...."
          onChange={handleChange}
        />
        <div className="auto-ul-container">
          {filteredSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="auto-btn">
        <Button.Primary func={handleClear}>Clear</Button.Primary>
        <Button.Primary func={handleSearch}>Search</Button.Primary>
      </div>
    </div>
  );
};

export default AutoInput;
