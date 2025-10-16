import React, { useState } from "react";
import Input from "./Input";
import SearchIcon from "../assets/search.svg";
import "../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <Input
          type="text"
          placeholder="Search To-Do"
          value={query}
          onChange={handleChange}
          variant="search"
          icon={<img src={SearchIcon} alt="Search" className="search-icon" />}
          iconPosition="left"
          id="search-input"
          name="search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
