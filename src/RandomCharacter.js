import React, { useEffect, useState } from 'react';
import Character from './Character';

function RandomCharacter() {
  const [randomCharacter, setRandomCharacter] = useState(null);

  useEffect(() => {
    const fetchRandomCharacter = async () => {
      try {
        const characterUrl = 'https://rickandmortyapi.com/api/character/';
        const characterResponse = await fetch(characterUrl);
        if (characterResponse.ok) {
          const characterData = await characterResponse.json();
          const totalCharacters = characterData.info.count;
          const randomCharacterId = Math.floor(Math.random() * totalCharacters) + 1;
          const randomCharacterUrl = `${characterUrl}${randomCharacterId}`;
          const randomCharacterResponse = await fetch(randomCharacterUrl);
          if (randomCharacterResponse.ok) {
            const randomCharacterInfo = await randomCharacterResponse.json();
            setRandomCharacter(randomCharacterInfo);
          } else {
            throw new Error('Error retrieving random character');
          }
        } else {
          throw new Error('Error retrieving character list');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRandomCharacter();
  }, []);

  return (
    <div className="container App">
      <img
        className="image-border img-fluid"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/640px-Rick_and_Morty.svg.png"
        alt="Rick and Morty"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h1 className="custom-font" style={{ fontSize: '325%' }}>
        Random Character
      </h1>
      {randomCharacter ? (
        <Character
          name={randomCharacter.name}
          species={randomCharacter.species}
          gender={randomCharacter.gender}
          origin={randomCharacter.origin.name}
          imageUrl={randomCharacter.image}
          location={randomCharacter.location.name}
          status={randomCharacter.status}
        />
      ) : (
        <p>Loading...</p>
      )}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}

export default RandomCharacter;
