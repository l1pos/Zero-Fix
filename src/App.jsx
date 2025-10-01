// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
import Hero from './components/Hero.jsx'; // Сцена 1
import HallSection from './components/Section.jsx'; // Сцена 2

function App() {
  // Состояние: 'intro' (по умолчанию) или 'hall' (после клика)
  const [sceneState, setSceneState] = useState('intro'); 
  const heroRef = useRef(null); // Ref для вызова анимаций Hero
  const hallRef = useRef(null); // Ref для вызова анимаций HallSection

  // Ключевой эффект: Гарантирует, что скролл всегда отключен
  useEffect(() => {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); 
  }, []); 

  // Функция, которую Hero вызовет после завершения анимации ухода
  const handleSceneChange = () => {
      // 1. Меняем состояние на 'hall'
      setSceneState('hall');
      
      // 2. Запускаем анимацию появления HallSection (если она есть)
      if (hallRef.current && hallRef.current.animateIn) {
           hallRef.current.animateIn();
      }
  };

  // Функция для запуска анимации перехода
  const handleStartTransition = () => {
    if (heroRef.current) {
        // Запускаем функцию анимации из Hero.jsx
        heroRef.current.startVideoZoomAndExit();
    }
  };

  // Стиль для контейнера, который гарантирует 100% видимого экрана
  const sceneContainerStyle = {
    position: 'relative', 
    height: '100vh', 
    width: '100vw', 
    overflow: 'hidden'
  };

  return (
    <div className="App" style={sceneContainerStyle}>
      {/* 1. Сцена Hero (отображается, пока state === 'intro') */}
      {sceneState === 'intro' && (
          <Hero 
            ref={heroRef} 
            onStartClick={handleSceneChange} 
          />
      )}
      
      {/* 2. Сцена Hall (отображается, когда state === 'hall') */}
      {sceneState === 'hall' && (
          <HallSection 
             ref={hallRef} 
          /> 
      )}
      {/* Если вам нужен компонент HallSection (Section.jsx), убедитесь, что вы его создали! */}
    </div>
  );
}

export default App;