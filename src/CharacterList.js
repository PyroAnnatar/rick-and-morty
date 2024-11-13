import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("name");

  const fetchCharacters = async () => {
    const allCharacters = [];
    for (let page = 1; page <= 40; page++) {
      const url = `https://rickandmortyapi.com/api/character?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      allCharacters.push(...data.results);
    }
    setCharacters(allCharacters.slice(0, 800));
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const getFilteredCharacters = () => {
    return characters.filter((c) =>
      String(c[filterType]).toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <div className="container App">
      <img
        src="https://pbs.twimg.com/media/CcvcLQvW0AAlEtL?format=jpg&name=medium"
        alt="Rick and Morty"
      />
      <h1 className="custom-font" style={{ fontSize: '350%' }}>Rick and Morty Character List</h1>

      <div>
        <label htmlFor="character-select">Search by Name:</label>
        <select onChange={handleFilterType}>
          <option value="name">name</option>
          <option value="species">species</option>
        </select>
        <input onChange={handleFilterChange} placeholder="Name" />
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-success table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Species</th>
                <th>Origin</th>
                <th>Status</th>


              </tr>
            </thead>
            <tbody>
              {getFilteredCharacters().map((character) => (
                <tr key={character.id}>
                  <td>
                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                  </td>
                  <td>
                    <img
                      src={character.image}
                      alt={character.name}
                      style={{ width: "150px", border: "2.5px solid #000000" }}
                    />
                  </td>
                  <td>{character.species}</td>
                  <td>{character.origin.name}</td>
                  <td>{character.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CharacterList;
