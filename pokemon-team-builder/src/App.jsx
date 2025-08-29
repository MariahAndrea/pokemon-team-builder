import "./App.css";
import { TeamProvider } from "./store/TeamContext";
import Pokedex from "./components/Pokedex";
import PokemonTeam from "./components/PokemonTeam";
import PokemonDisplay from "./components/PokedexDisplay";

export default function App() {
    return (
      <TeamProvider>
      <div> 
        <header> 
            <h1>Pokémon Team Builder</h1>
        </header>
        <main>
          <div className="pokedexLayout">
              <Pokedex/>
              <PokemonTeam/>
          </div>
        </main>
      </div>
      </TeamProvider>
  );

}