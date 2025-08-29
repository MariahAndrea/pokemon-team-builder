import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export function useTeam() {
    return useContext(TeamContext);
}

export function TeamProvider({children}){
    const [team, setTeam] = useState(() => {
        try {
            const raw = localStorage.getItem("pokemon-team");
            return raw ? JSON.parse(raw) : [];
        } catch (e){
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem("pokemon-team", JSON.stringify(team));
        } catch (e) {
            console.warn("Failed to save team", e);
        }
    }, [team]);

    function addPokemon(pokemon) {
        setTeam((prev) => {
            if (prev.find((p) => p.id === pokemon.id) || prev.length >=6 ) return prev;
            return [
                ...prev,
                {
                    id: pokemon.id,
                    name: pokemon.name,
                    sprite: pokemon.sprite,
                },
            ];
        });
    }

    function removePokemon(id) {
        setTeam((prev) => prev.filter((p) => p.id !== id));
    }
    
    function isInTeam(id) {
        return team.some((p) => p.id === id);
    }

    function isFull() {
        return team.length >= 6;
    }

    function clearTeam() {
        setTeam([]);
    }
    
    return (
        <TeamContext.Provider value={{ team, addPokemon, removePokemon, isInTeam, isFull, clearTeam}}>
            {children}
        </TeamContext.Provider>
    )

}