import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <div id="home">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
        <div>
          <img src="img/pokedex.png" alt="Pokedex" style={{ width: '350px', height: 'auto', animation: 'zoomInOut 6s infinite alternate'}} />
        </div>
        <a href="/pokedex">
          <button className="comic-button">Start</button>
        </a>
        <a href='https://pokeapi.co/' target='_blank' style={{ color: 'yellow', textDecoration: 'none'}}>©: PokéAPI</a>
      </div>
    </div>
  );
};

export default Home;
