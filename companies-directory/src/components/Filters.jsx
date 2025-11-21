import React, { useEffect, useState } from "react";

const locations = [
  "",
  "Hyderabad, India",
  "Mumbai, India",
  "Bengaluru, India",
  "Pune, India",
  "Delhi, India"
];

const industries = [
  "",
  "Software",
  "Finance",
  "Healthcare",
  "Cloud",
  "Education",
  "Retail",
  "Energy",
  "Cybersecurity",
  "Agriculture",
  "Travel"
];

function Filters({
  searchTerm,
  onSearchChange,
  location,
  onLocationChange,
  industry,
  onIndustryChange,
  onReset
}) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const id = setTimeout(() => {
      onSearchChange(localSearch);
    }, 400);

    return () => clearTimeout(id);
  }, [localSearch, onSearchChange]);

  return (
    <form
      className="filters-bar"
      aria-label="Company filters"
      onSubmit={(e) => e.preventDefault()}
    >
      <label>
        <span className="visually-hidden">Search by name</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          aria-label="Search companies by name"
        />
      </label>

      <label>
        Location
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          aria-label="Filter by location"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc || "All locations"}
            </option>
          ))}
        </select>
      </label>

      <label>
        Industry
        <select
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
          aria-label="Filter by industry"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind || "All industries"}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={onReset}>
        Clear filters
      </button>
    </form>
  );
}

export default Filters;
