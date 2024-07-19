import React from 'react';
import './Home.css';


const Home = () => {
  return (
    <div id="home" style={{ backgroundImage: `url('img/background.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
        <div>
          <img src="img/pokedex.png" alt="Pokedex" style={{ width: '350px', height: 'auto' }} />
        </div>
        <a href="/pokedex">
          <button className="comic-button">Start</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
