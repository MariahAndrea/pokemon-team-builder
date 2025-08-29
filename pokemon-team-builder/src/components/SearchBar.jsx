import React from "react";

export default function SearchBar({ query, setQuery }) {
    return (
        <input
            className="search"
            placeholder="Search pokemon"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
        />
    );
}
