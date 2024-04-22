import { useEffect } from "react";
import { useState } from "react";
import Pokemon from "./Pokemon";
function Card() {
  const [pokemon, setPokemon] = useState([]);
  const [query, setQuery] = useState("");
  const filteredPokemon = pokemon.filter((p) => {
    return p.name.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    requestPokemon(0);
  }, []);

  async function LoadMore(offset) {
    await requestPokemon(offset);
  }

  async function requestPokemon(offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=${offset}`;
    const res = await fetch(url);
    const json = await res.json();
    const pokemonList = json.results;
    const pokemonDataArray = [];
    for (const pokemon of pokemonList) {
      const pokemonDataObject = await FetchPokemonData(pokemon);
      pokemonDataArray.push(pokemonDataObject);
    }
    setPokemon(pokemonDataArray);
    return pokemonDataArray;
  }

  return (
    <div>
      <div id="search-section">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          name=""
          value={query}
          id="search-bar"
          placeholder="Pikachu"
        />
      </div>
      <div className="pokedex_container">
        {filteredPokemon.map((pkmn) => (
          <Pokemon
            key={pkmn.id}
            id={pkmn.id}
            name={pkmn.name}
            firstType={pkmn.firstType}
            secondType={pkmn.secondType}
            sprite={pkmn.sprite}
            cry={pkmn.cry}
            hp={pkmn.hp}
            attack={pkmn.attack}
            specialAttack={pkmn.specialAttack}
            defense={pkmn.defense}
            specialDefense={pkmn.specialDefense}
            speed={pkmn.speed}
            description={pkmn.description}
          />
        ))}
      </div>
    </div>
  );
}

async function FetchPokemonData(p) {
  const res = await fetch(p.url);

  const pokemonDataJson = await res.json();
  const { id, name, types, sprites, cries, stats } = pokemonDataJson;
  const sprite = sprites.other["official-artwork"].front_default;
  const [hpStat, atkStat, defenseStat, spAtkStat, spDefStat, speedStat] = stats;
  const { base_stat: hp } = hpStat;
  const { base_stat: attack } = atkStat;
  const { base_stat: defense } = defenseStat;
  const { base_stat: specialAttack } = spAtkStat;
  const { base_stat: specialDefense } = spDefStat;
  const { base_stat: speed } = speedStat;
  const [firstTypeObject, secondTypeObject] = types;
  const {
    type: { name: firstType },
  } = firstTypeObject;
  const { type: { name: secondType } = { name: "" } } = secondTypeObject || {};
  const cry = cries.latest;

  const pokemonSpeciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  );
  const pokemonSpeciesJson = await pokemonSpeciesRes.json();
  const { flavor_text_entries: flavorTextEntries } = pokemonSpeciesJson;
  const [englishFlavorText] = flavorTextEntries;
  const { flavor_text: description } = englishFlavorText;
  return {
    id,
    name,
    firstType,
    secondType,
    sprite,
    cry,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    description,
  };
}
export default Card;
