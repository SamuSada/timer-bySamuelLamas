import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo } from '@fortawesome/free-solid-svg-icons';
import './Timer.css'; // Importamos el archivo CSS
import buttonSound from '../assets/buttonSound.mp3'; // Importamos el sonido de los botones
import timerSound from '../assets/timerSound.mp3'; // Importamos el sonido del temporizador

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0); // Valor inicial del temporizador
  const [isRunning, setIsRunning] = useState(false);

  // Referencias a los elementos de audio
  const buttonSoundRef = useRef(new Audio(buttonSound));
  const timerSoundRef = useRef(new Audio(timerSound));

  // Constantes de volumen para los sonidos
  const BUTTON_SOUND_VOLUME = 0.1; // Volumen de los sonidos de los botones
  const TIMER_SOUND_VOLUME = 1.0; // Volumen del sonido del temporizador

  // Función para reproducir el sonido de los botones
  const playButtonSound = () => {
    buttonSoundRef.current.volume = BUTTON_SOUND_VOLUME;
    buttonSoundRef.current.play();
  };

  // Función para reproducir el sonido del temporizador
  const playTimerSound = () => {
    timerSoundRef.current.volume = TIMER_SOUND_VOLUME;
    timerSoundRef.current.play();
  };

  // Función para incrementar horas
  const incrementHours = () => {
    setHours((prevHours) => (prevHours + 1) % 24);
    playButtonSound();
  };

  // Función para decrementar horas
  const decrementHours = () => {
    setHours((prevHours) => (prevHours === 0 ? 23 : prevHours - 1));
    playButtonSound();
  };

  // Función para incrementar minutos
  const incrementMinutes = () => {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 59) {
        incrementHours();
        return 0;
      } else {
        return prevMinutes + 1;
      }
    });
    playButtonSound();
  };

  // Función para decrementar minutos
  const decrementMinutes = () => {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 0) {
        if (hours === 0) return 0;
        decrementHours();
        return 59;
      } else {
        return prevMinutes - 1;
      }
    });
    playButtonSound();
  };

  // Función para incrementar segundos
  const incrementSeconds = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        incrementMinutes();
        return 0;
      } else {
        return prevSeconds + 1;
      }
    });
    playButtonSound();
  };

  // Función para decrementar segundos
  const decrementSeconds = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        if (minutes === 0) {
          if (hours === 0) return 0;
          decrementHours();
          setMinutes(59);
        } else {
          decrementMinutes();
        }
        return 59;
      } else {
        return prevSeconds - 1;
      }
    });
    playButtonSound();
  };

  // Función para iniciar el temporizador
  const startTimer = () => {
    setIsRunning(true);
    playButtonSound();
  };

  // Función para pausar el temporizador
  const pauseTimer = () => {
    setIsRunning(false);
    playButtonSound();
  };

  // Función para reiniciar el temporizador
  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(10); // Restablecer el valor inicial del temporizador
    setIsRunning(false);
    playButtonSound();
  };

  // Efecto para manejar el temporizador
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0 && hours === 0) {
            playTimerSound();
            setIsRunning(false);
            clearInterval(intervalId);
          } else {
            decrementSeconds();
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, hours]);

  return (
    <div className="timer-container">
      {/* Elementos de audio ocultos */}
      <audio ref={buttonSoundRef} src={buttonSound} style={{ display: 'none' }} />
      <audio ref={timerSoundRef} src={timerSound} style={{ display: 'none' }} />

      <div className="timer-display">
        <div>
          <button onClick={incrementHours}>+</button>
          <span>{String(hours).padStart(2, '0')}</span>
          <button onClick={decrementHours}>-</button>
        </div>
        <div>
          <button onClick={incrementMinutes}>+</button>
          <span>{String(minutes).padStart(2, '0')}</span>
          <button onClick={decrementMinutes}>-</button>
        </div>
        <div>
          <button onClick={incrementSeconds}>+</button>
          <span>{String(seconds).padStart(2, '0')}</span>
          <button onClick={decrementSeconds}>-</button>
        </div>
      </div>
      <div className="timer-controls">
        <button onClick={startTimer}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button onClick={pauseTimer}>
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
