import React, { useEffect, useState } from "react";

function LocationList(props) {
  const [locations, setLocations] = useState([]);

  async function fetchLocations() {
    const response = await fetch("https://rickandmortyapi.com/api/location");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLocations(data.results);
    }
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container App">
      <img
        src="https://preview.redd.it/o6cwlzg3exk41.png?width=960&crop=smart&auto=webp&v=enabled&s=e29c84013ab4bb1bf5a51ded8b4b31ff478a9feb"
        alt="Rick and Morty"
      />
      <h1 className="custom-font" style={{ fontSize: "350%" }}>
        Rick and Morty Location List
      </h1>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Type</th>
            <th>Dimension</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => {
            return (
              <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.type}</td>
                <td>{location.dimension}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LocationList;
