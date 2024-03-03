import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const SoundboardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfigureKeyButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const TriggerKeySpan = styled.span`
  color: green;
`;

const AudioPlayer = ({ file, volume }) => {
  const handlePlay = () => {
    const audio = new Audio(URL.createObjectURL(file));
    audio.volume = volume / 100; // Convertir le volume en pourcentage
    audio.play();
  };

  return (
    <div>
      <button onClick={handlePlay}>{file.name}</button>
    </div>
  );
};

const Soundboard = ({ files, onDelete, onKeyBind, triggerKey }) => {
  const [volume, setVolume] = useState(50); // Volume initial

  const handleDelete = () => {
    onDelete();
  };

  const handleConfigureKey = () => {
    const newKey = prompt('Veuillez entrer la touche du clavier pour déclencher cette soundboard (ex: a, b, c, etc.)');
    if (newKey !== null && newKey !== '') {
      onKeyBind(newKey);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <SoundboardContainer>
      <div>
        {files.map((file, index) => (
          <AudioPlayer key={index} file={file} volume={volume} />
        ))}
      </div>
      <div>
        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
        <DeleteButton onClick={handleDelete}>Supprimer</DeleteButton>
        <ConfigureKeyButton onClick={handleConfigureKey}>Configurer la touche</ConfigureKeyButton>
        {triggerKey && <TriggerKeySpan>Touche : {triggerKey}</TriggerKeySpan>}
      </div>
    </SoundboardContainer>
  );
};

const SoundBoardPage = () => {
  const [soundboards, setSoundboards] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSoundboards(prevSoundboards => [...prevSoundboards, { files: newFiles, triggerKey: null }]);
  };

  const handleDeleteSoundboard = (index) => {
    setSoundboards(prevSoundboards => {
      const updatedSoundboards = [...prevSoundboards];
      updatedSoundboards.splice(index, 1);
      return updatedSoundboards;
    });
  };

  const handleKeyBind = (index, key) => {
    setSoundboards(prevSoundboards => {
      const updatedSoundboards = [...prevSoundboards];
      updatedSoundboards[index].triggerKey = key;
      return updatedSoundboards;
    });
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      soundboards.forEach((soundboard, index) => {
        if (soundboard.triggerKey && event.key.toLowerCase() === soundboard.triggerKey.toLowerCase()) {
          soundboard.files.forEach(file => {
            const audio = new Audio(URL.createObjectURL(file));
            audio.play();
          });
        }
      });
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [soundboards]);

  return (
    <div>
      <h1>Soundboard</h1>
      <input type="file" onChange={handleFileChange} accept="audio/*" multiple />
      {soundboards.map((soundboard, index) => (
        <Soundboard
          key={index}
          files={soundboard.files}
          onDelete={() => handleDeleteSoundboard(index)}
          onKeyBind={(key) => handleKeyBind(index, key)}
          triggerKey={soundboard.triggerKey}
        />
      ))}
    </div>
  );
};

export default SoundBoardPage;