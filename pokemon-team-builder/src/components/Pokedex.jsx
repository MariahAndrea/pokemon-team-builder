import React, { useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch";
import PokemonDisplay from './PokedexDisplay';
import SearchBar from './SearchBar';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default function Pokedex() {
    const { data, loading, error } = useFetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
    );

    const [query, setQuery] = useState("");
    const [pokemonDetails, setPokemonDetails] = useState(({}));

    useEffect(() => {
        if(!data) return;

        async function fetchDetails(){
            const details = {};
            await Promise.all(
                data.results.map(async (p) => {
                const res = await fetch(p.url);
                const pokeData = await res.json();
                details[p.name] = pokeData.types.map((t) => t.type.name);
                })
            );
            setPokemonDetails(details);
            }

            fetchDetails();
        }, [data]);

    if (loading) return <p>Loading Pokédex...</p>;
    if (error) return <p>Error: Failed to load Pokédex</p>;

    const list = data?.results || [];

    const q = query.trim().toLowerCase();
    const filtered = q
        ? list.filter((p) => p.name.toLowerCase().includes(q))
        : list;

    return (
        <div className="pokedex">
            <div className="pokedexHeader">
                <h1>Pokédex</h1>
                <SearchBar query={query} setQuery={setQuery} />
            </div>
            

            <div className="pokedexGrid">
            {filtered.map((p, index) => {
                const urlParts = p.url.split("/").filter(Boolean);
                const id = urlParts[urlParts.length - 1];
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            
                return(
                    <PokemonDisplay 
                        key={p.name} 
                        id={id} 
                        name={capitalize(p.name)}
                        sprite={sprite}
                        types={pokemonDetails[p.name] || []}
                        
                    />
                );
            })}
            </div>
        </div>
  );
}