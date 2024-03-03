import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Soundboard from '../components/sounboard/Soundboard';

const SoundboardPage = () => {
  const [soundboards, setSoundboards] = useState([]);
  const fileInput = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/soundboards')
      .then((res) => {
        setSoundboards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddSoundboard = () => {
    if (fileInput.current && fileInput.current.files.length > 0) {
      const formData = new FormData();
      const file = fileInput.current.files[0];
      formData.append('file', file);
      formData.append('name', file.name); // Utiliser le nom du fichier comme nom de la soundboard
  
      axios.post('http://localhost:5000/api/soundboards', formData)
        .then((res) => {
          // Mettre à jour l'état des soundboards
          setSoundboards([...soundboards, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  };
  
  

  const handleDeleteSoundboard = (index) => {
    const soundboardId = soundboards[index]._id;

    axios.delete(`http://localhost:5000/api/soundboards/${soundboardId}`)
      .then(() => {
        // Mettre à jour l'état des soundboards
        const updatedSoundboards = [...soundboards];
        updatedSoundboards.splice(index, 1);
        setSoundboards(updatedSoundboards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Soundboard</h1>
      <ul>
        {soundboards.map((soundboard, index) => (
          <li key={soundboard._id}>
            <Soundboard
              soundboard={soundboard}
              onDelete={() => handleDeleteSoundboard(index)}
            />
          </li>
        ))}
      </ul>
      <input type="file" ref={fileInput} />
      <button onClick={handleAddSoundboard}>Ajouter une soundboard</button>
    </div>
  );
};

export default SoundboardPage;
