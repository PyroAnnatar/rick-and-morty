import CharacterContext from "../contexts/CharacterContext";

import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

function CharacterDetails() {
  const { isLoading, character, fetchCharacter } = useContext(CharacterContext);
  const { id } = useParams();

  useEffect(() => {
    fetchCharacter(id);
  }, [id]);

  if (isLoading.character) {
    return (
      <p className="text-white text-xl">Loading brain cells {`><))))*>`}</p>
    );
  }

  if (!character) {
    return <p className="text-white text-xl">Couldn't find character.</p>;
  }

  return (
    <div className="container App">
      <img
        className="max-w-full h-auto mx-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/640px-Rick_and_Morty.svg.png"
        alt="Rick and Morty"
      />
      <h1 className="custom-font text-[2.5rem] mt-4">
        Individual Character Details
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[2rem]">{character.name}</h2>
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
        <div className="w-full flex justify-center items-center md:w-1/2 p-4">
          <img
            src={character.image}
            alt={character.name}
            className="border-4 border-green-600 max-w-full"
          />
        </div>
      </div>
      <div className="h-12"></div>
    </div>
  );
}

export default CharacterDetails;
