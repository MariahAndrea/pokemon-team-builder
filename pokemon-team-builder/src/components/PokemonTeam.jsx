import React from "react";
import { useTeam } from "../store/TeamContext";

export default function PokemonTeam() {
    const { team, removePokemon, clearTeam } = useTeam();
    const slots = new Array(6).fill(null);
    team.forEach((p, i) => (slots[i] = p));

    return (
        <aside className="team-view">
                <h2>Your Team</h2>
                <span className="count">{team.length} / 6</span>
        
        <div className="slots">
            {slots.map((p, idx) => (
            <div
                key={idx}
                className="slot"
                onClick={() => p && removePokemon(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && p && removePokemon(p.id)}
            >
                {p ? (
                    <>
                        <img src={p.sprite} alt={p.name} />
                        <div className="slot-name">{p.name}</div>
                        <small className="hint">click to remove</small>
                    </>
                ) : (
                    <div className="empty">Empty</div>
                )}
            </div>
        ))}
      </div>

      {team.length > 0 && (
        <button onClick={clearTeam}> 
            Clear Team
        </button>
      )}
    </aside>
  );
}
