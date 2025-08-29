import React from "react";
import { useTeam } from "../store/TeamContext";

export default function PokemonDisplay({ id, name, sprite, types }) {
    const { addPokemon, isInTeam, isFull } = useTeam();
    const inTeam = isInTeam(id);
    const disabled = inTeam || isFull();

    return (
        <div className="pokemonCard">
            <div className="pokemonTypes">
                {(types ??[]).map((type) => (
                    <span key={type} className={`type-badge type-${type}`}>
                        {type}
                    </span>
                ))}
            </div>

            <img src={sprite} alt={name} />

            <p className="poke-label"><span className="poke-name">{name}</span></p>

            <button
                className={`add-btn ${inTeam ? "in-team" : ""} ${isFull() ? "team-full" : ""}`}
                onClick={() => addPokemon({ id, name, sprite, types })}
                disabled={disabled}
            >
            {inTeam ? "In Team" : isFull() ? "Team Full" : "Add to Team"}
            </button>
         </div>
    );
}
