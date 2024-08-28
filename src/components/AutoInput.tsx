import React, { useState } from "react";
import Button from "./Button";
import "../styles/components/AutoInput.style.scss";

interface AutoInput {
  contacName: string[];
  onClickInput: (changeInputValue: string) => void;
}

const AutoInput: React.FC<AutoInput> = ({ contacName, onClickInput }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filterContactName, setFilterContactName] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onClickInput(inputValue)
    setFilterContactName(
      contacName.filter((contacName) =>
        contacName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleClick = (name?: string) => {
    setInputValue(name || "");
    setFilterContactName([])
    onClickInput(name || "")
  }

  const handleSearch = () => {
    onClickInput(inputValue);
  };

  return (
    <div className="autocomplete-input">
      <div className="auto-input">
        <input
          type="text"
          required
          value={inputValue}
          placeholder="Search Name...."
          onChange={handleChange}
        />
        <div className="auto-ul-container">
          {filterContactName.length > 0 && (
            <ul className="suggestions-list">
              {filterContactName.map((names, index) => (
                <li key={index} onClick={() => handleClick(names)}>{names}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="auto-btn">
        <Button.Primary func={() => handleClick()}>Clear</Button.Primary>
        <Button.Primary func={() => handleSearch()}>Search</Button.Primary>
      </div>
    </div>
  );
};

export default AutoInput;