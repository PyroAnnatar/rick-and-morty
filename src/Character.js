import React from 'react';

function Character({ name, species, gender, origin, imageUrl, location, status }) {
  return (
    <div>
      <h3>{name}</h3>
      <p><b>Species:</b> {species}</p>
      <p><b>Gender:</b> {gender}</p>
      <p><b>Origin:</b> {origin}</p>
      <p><b>Location:</b> {location}</p>
      <img src={imageUrl} alt={name} style={{border: "4px solid #00b601" }}/>
      <p></p>
      <p><b>Status:</b> {status}</p>
    </div>
  );
}

export default Character;
