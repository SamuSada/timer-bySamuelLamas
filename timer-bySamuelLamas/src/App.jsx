import React from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {
  return (
    <div className="App">
      <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/19642653/19642653-hd_1280_720_30fps.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      <div className="content-container">
        <h1 className="title">Timer by<br/>Samuel Lamas</h1>
        <Timer />
      </div>
    </div>
  );
}

export default App;
