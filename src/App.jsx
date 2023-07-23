import React, { useEffect, useState } from 'react';
import './PokemonList.scss';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return pokemonData;
        });

        const pokemonDataList = await Promise.all(promises);
        setPokemonList(pokemonDataList);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list">
      <div className="pokemon-list__search-header-container">
        <h1 className="pokemon-list__heading">Pokémon List</h1>
        <div className="pokemon-list__search-bar">
          <input
            type="text"
            className="pokemon-list__search-input"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
      <div className="pokemon-list__grid">
        {filteredPokemonList.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.id}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-card__image"
            />
            <p className="pokemon-card__name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
