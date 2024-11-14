import React, { createContext, useEffect, useState } from "react";

const CharacterContext = createContext();

function CharacterProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [isLoading, setIsLoading] = useState({
    characters: false,
    randomCharacter: false,
    character: false,
    locations: false,
  });
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [locations, setLocations] = useState([]);

  const fetchCharacters = async () => {
    try {
      // Farklı loading stateleriyle koşula bağlı farklı şeyler döndürmek için
      setIsLoading((prev) => ({ ...prev, characters: true }));
      // Yeterince hızlı bir API kullanmamıza rağmen UX için ve CLS gibi endişeleri azaltmak için suni bi gecikme
      await new Promise((resolve) => setTimeout(resolve, 500));
      const allCharacters = [];
      for (let page = 1; page <= 40; page++) {
        const url = `https://rickandmortyapi.com/api/character?page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        allCharacters.push(...data.results);
      }
      setCharacters(allCharacters.slice(0, 800));
    } catch (error) {
      console.error("Whoopsie", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, characters: false }));
    }
  };

  const fetchRandomCharacter = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, randomCharacter: true }));
      await new Promise((resolve) => setTimeout(resolve, 500));
      const characterUrl = "https://rickandmortyapi.com/api/character/";
      const characterResponse = await fetch(characterUrl);
      if (characterResponse.ok) {
        const characterData = await characterResponse.json();
        const totalCharacters = characterData.info.count;
        const randomCharacterId =
          Math.floor(Math.random() * totalCharacters) + 1;
        const randomCharacterUrl = `${characterUrl}${randomCharacterId}`;
        const randomCharacterResponse = await fetch(randomCharacterUrl);
        if (randomCharacterResponse.ok) {
          const randomCharacterInfo = await randomCharacterResponse.json();
          setRandomCharacter(randomCharacterInfo);
        } else {
          throw new Error("Error retrieving random character");
        }
      } else {
        throw new Error("Error retrieving character list");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, randomCharacter: false }));
    }
  };

  const fetchCharacter = async (id) => {
    try {
      setIsLoading((prev) => ({ ...prev, character: true }));
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setCharacter(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Whoopsie", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, character: false }));
    }
  };

  const fetchLocations = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, locations: true }));
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("https://rickandmortyapi.com/api/location");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLocations(data.results);
      }
    } catch (error) {
      console.error("Whoopsie", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, locations: false }));
    }
  };

  // Navbar'da bir linke tıkladıktan sonra Navbar'ın otomatik kapanması
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Home'a tıkladığımızda gereksizce Navbar'ı açıp kapatmaması için sabit mantık seçeneği
  const toggleOff = () => {
    setIsOpen(false);
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
    <CharacterContext.Provider
      value={{
        toggleOff,
        isOpen,
        toggle,
        character,
        fetchCharacter,
        locations,
        fetchLocations,
        isLoading,
        characters,
        filterValue,
        filterType,
        getFilteredCharacters,
        handleFilterChange,
        handleFilterType,
        randomCharacter,
        fetchRandomCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export { CharacterProvider };
export default CharacterContext;
