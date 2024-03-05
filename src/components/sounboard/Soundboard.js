import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Soundboard = ({ soundboard, onDelete, onKeyBind }) => {
  const [volume, setVolume] = useState(100);
  const [shortcutKey, setShortcutKey] = useState(null);

  const handlePlay = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/api/soundboards/${soundboard._id}`);
      const audioUrl = response.data.file;
     
      const audio = new Audio(audioUrl);
    
      audio.volume = volume / 100;
 
      audio.play();
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
    }
  };

  const handleVolumeChange = event => {
    setVolume(event.target.value);
  };

  const handleAddShortcut = () => {
    const key = window.prompt('Veuillez entrer une touche pour le raccourci clavier (A-Z)', '');

    if (key && key.match(/^[a-zA-Z]$/) !== null) {
      setShortcutKey(key.toUpperCase());
      onKeyBind(soundboard._id, key.toUpperCase());
    } else {
      alert("Veuillez entrer une lettre de A à Z comme raccourci.");
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key.toUpperCase() === shortcutKey) {
        handlePlay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcutKey]);

  return (
    <div>
      <h2>{soundboard.name}</h2>
      <button className="btn-big" onClick={handlePlay}><i className="fas fa-play"></i>Play</button>
      <button className="btn-big" onClick={onDelete}><i className="fas fa-trash"></i>Delete</button>
      <div>
        <label htmlFor="volume">Volume:</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <button onClick={handleAddShortcut}>Ajouter Raccourci</button>
      {shortcutKey && (
        <div>
          <p>Raccourci clavier enregistré: {shortcutKey}</p>
        </div>
      )}
    </div>
  );
};

export default Soundboard;
