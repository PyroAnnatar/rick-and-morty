import React, { useEffect, useState } from 'react';
import { rickAndMortyQuotes } from './Quotations';
import { Link } from 'react-router-dom';

function HomePage() {
  const [randomQuote, setRandomQuote] = useState('');

  const generateRandomQuote = () => {
    const quoteKeys = Object.keys(rickAndMortyQuotes);
    const randomQuote = quoteKeys[Math.floor(Math.random() * quoteKeys.length)];
    return rickAndMortyQuotes[randomQuote];
  };

  const handleClick = () => {
    const newQuote = generateRandomQuote();
    setRandomQuote(newQuote);
  };

  useEffect(() => {
    const initialQuote = generateRandomQuote();
    setRandomQuote(initialQuote);
  }, []);

  return (

    <div className="container-fluid" style={{ backgroundColor: '#26b1c6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="row">
        <div className="col-lg-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/640px-Rick_and_Morty.svg.png"
            alt="Rick and Morty"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 mt-3">
          <h1 className="custom-font" style={{ fontSize: '3.25rem', textAlign: 'center' }}>
            Inside The Rick And Morty Universe
          </h1>
          <h5 style={{ textAlign: 'center' }}>{randomQuote}</h5>
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-primary" onClick={handleClick}>
              Click for new quote
            </Link>
          </div>
        </div>
        <div className="col-12 mt-3">
          <img
            src="637645.jpg"
            alt="Home page"
            className="img-fluid"
            style={{
              border: '4px solid #00b601', maxWidth: '100%', height: 'auto',
            }}
          />
        </div>
      </div>
    </div>

  );
}

export default HomePage;
