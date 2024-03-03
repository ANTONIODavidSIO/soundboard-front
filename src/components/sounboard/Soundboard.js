import React, { useState, useEffect } from 'react';

const Soundboard = ({ soundboard, onDelete }) => {
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setAudioBlob(reader.result);
    };
    reader.readAsDataURL(soundboard.file);
  }, [soundboard.file]);

  const handlePlay = () => {
    const audioElement = document.getElementById(`audio-${soundboard._id}`);
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  return (
    <div>
      <h2>{soundboard.name}</h2>
      <button onClick={handlePlay}><i className="fas fa-play"></i></button>
      <button onClick={onDelete}><i className="fas fa-trash"></i></button>
      <audio controls src={audioBlob} />
    </div>
  );
};

export default Soundboard;
