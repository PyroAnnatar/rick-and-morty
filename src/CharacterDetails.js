import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

      if (response.ok) {
        const data = await response.json();
        setCharacter(data);
        console.log(data);
      }
    }

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container App">
      <img
        className="image-border img-fluid"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/640px-Rick_and_Morty.svg.png"
        alt="Rick and Morty"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h1 className="custom-font">Individual Character Details</h1>
      <div className="row">
        <div className="col-md-6">
          <div>
            <h2>{character.name}</h2>
            <p>
              <b>Species:</b> {character.species}
            </p>
            <p>
              <b>Gender:</b> {character.gender}
            </p>
            <p>
              <b>Origin:</b> {character.origin.name}
            </p>
            <p>
              <b>Location:</b> {character.location.name}
            </p>
            <p>
              <b>Status:</b> {character.status}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src={character.image}
            alt={character.name}
            style={{ border: "4px solid #00b601", maxWidth: "100%" }}
          />
        </div>
      </div>
      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default CharacterDetails;
