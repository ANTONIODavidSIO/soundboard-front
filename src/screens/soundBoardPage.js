import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Soundboard from '../components/sounboard/Soundboard';

const SoundboardPage = () => {
  const [soundboards, setSoundboards] = useState([]);
  const [fileInput, setFileInput] = useState(null);

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
    const formData = new FormData();
    console.log(fileInput)
    formData.append('file', fileInput.current.files[0]);

    axios.post('localhost:5000/api/soundboards', formData)
      .then((res) => {
        // Mettre à jour l'état des soundboards
        setSoundboards([...soundboards, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteSoundboard = (index) => {
    const soundboardId = soundboards[index]._id;

    axios.delete(`localhost:5000/api/soundboards/${soundboardId}`)
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
