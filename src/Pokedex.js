import React, { useEffect } from 'react';
import './Pokedex.css'; // Import your CSS file

const Pokedex = () => {
  let modal;

  useEffect(() => {
    getAllPokemon();
  }, []);

  function getAllPokemon() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1017';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(pokemon => {
          fetchPokemonDetails(pokemon.url);
        });
      })
      .catch(error => {
        console.error('Error fetching Pokémon list:', error);
        alert('Error fetching Pokémon list. Please try again.');
      });
  }

  const openSearchModal = () => {
    const searchModal = document.getElementById('search-modal');
    searchModal.style.display = 'flex';

    const searchInput = document.getElementById('search-input');
    searchInput.value = ''; // Clear the input field when opening the modal

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = closeModal;
  };

  const handleSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    // Check if the search term is blank
    if (searchTerm === '') {
      alert('Please enter a Pokemon ID or Name.');
      return;
    }

    // Check if the search term is a valid Pokemon ID or name
    if (!isNaN(searchTerm) || isNaN(searchTerm)) {
      // Assume it's an id or name
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`, true);
    } else {
      // If not found
      alert('Error fetching Pokémon data. Please check the ID or Name and try again.');
    } 

    closeSearchModal()
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Trigger the search when the "Enter" key is pressed
      handleSearch();
    }
  };

  // Update the fetchPokemonDetails function
  const fetchPokemonDetails = (url, isSearch) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid Pokemon ID or Name');
        }
        return response.json();
      })
      .then(pokemonData => {
        // Display Pokemon details in the modal
        if (isSearch) {
          openModal(pokemonData);
        } else {
          displayPokemonInfo(pokemonData);
        }
      })
      /*
      .catch(error => {
        console.error('Error fetching Pokémon data:', error.message);

      });
      */
  };

  function displayPokemonInfo(pokemonData) {
    const resultElement = document.getElementById('result');
    const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);

    const imgSrc = pokemonData.sprites.front_default || 'img/default.png'; // Replace with the path to your default image

    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `<h2>${capitalizedPokemonName}</h2>
                             <img src="${imgSrc}" alt="${capitalizedPokemonName}">`;

    // Add click event listener to open modal
    pokemonCard.onclick = function () {
      openModal(pokemonData);
    };

    resultElement.appendChild(pokemonCard);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Close modal function
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'none';
  }


  function openModal(pokemonData) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    const typeImages = {
      bug: 'Bug.png',
      dark: 'Dark.png',
      dragon: 'Dragon.png',
      electric: 'Electric.png',
      fairy: 'Fairy.png',
      fighting: 'Fighting.png',
      fire: 'Fire.png',
      flying: 'Flying.png',
      ghost: 'Ghost.png',
      grass: 'Grass.png',
      ground: 'Ground.png',
      ice: 'Ice.png',
      normal: 'Normal.png',
      poison: 'Poison.png',
      psychic: 'Psychic.png',
      rock: 'Rock.png',
      steel: 'Steel.png',
      water: 'Water.png',
      // Add more types as needed
    };

    const typeImagesHTML = pokemonData.types.map(type => {
      const typeName = type.type.name;
      const imageUrl = typeImages[typeName.toLowerCase()] || ''; // Default to an empty string if no image is specified
      return `<img src="types/${imageUrl}" alt="${typeName}" class="type-image" style="width: 70px; height: 25px;">`;
    }).join(' ');

    const abilitiesHTML = pokemonData.abilities.map(ability => {
      return `<li>${capitalizeFirstLetter(ability.ability.name)}</li>`;
    }).join('');

    /*
    const statsHTML = pokemonData.stats.map(stat => {
      return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
    }).join('');
*/
    
    // Display the details inside the modal
    const capitalizedPokemonName = capitalizeFirstLetter(pokemonData.name);
    const imgSrc = pokemonData.sprites.front_default || 'img/default.png';

    modalContent.innerHTML = `<h2>${capitalizedPokemonName}</h2>
                           <div style="text-align: center;">
                              <img src="${imgSrc}" alt="${capitalizedPokemonName}" style="width: 150px; height: 150px; margin: 0 auto; animation: bounce 2s infinite;">
                           </div>
                           <p>ID: ${pokemonData.id}</p>
                           <p>Height: ${pokemonData.height} decimetres</p>
                           <p>Weight: ${pokemonData.weight} hectograms</p>
                           <p>Types:</p>
                           <p>${typeImagesHTML}</p>
                           <p>Abilities: <ul>${abilitiesHTML}</ul></p>

    modal.style.display = 'flex';
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = closeModal;
  }

  return (
    <>
      <video id="video-background" autoPlay muted loop>
        <source src="img/background2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <a>
        <div style={{ textAlign: 'center' }}>
          <img src="img/pokedex.png" alt="Pokedex" style={{ width: '200px', height: 'auto', marginBottom: '20px' }} />
        </div>
      </a>

      {/* Add this div at the end of your body */}
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div id="modal-content"></div>
        </div>
      </div>

      <div id="result" className="pokemon-container"></div>

      {/* Search Modal */}
      <div id="search-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeSearchModal}>&times;</span>
          <div>
            <input
              type="text"
              id="search-input"
              placeholder="Enter Pokemon ID or Name"
              onKeyDown={handleEnterKeyPress}
            />
          </div>
        </div>
      </div>

      <img
        src='img/pokedex2.png'
        alt="Pokedex"
        style={{
          width: '155px',
          height: '155px',
          position: 'fixed',
          bottom: '0',
          right: '0',
          margin: '20px',
        }}
        className="dancing-pokedex"
        onClick={openSearchModal} // Open search modal on click
      />

    </>
  );
};

export default Pokedex;
