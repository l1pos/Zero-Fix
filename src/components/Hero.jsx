// src/components/Hero.jsx

import React, { useRef } from "react";
// Импорт стилей, вероятно, не нужен, если вы используете App.css

// Принимаем обработчик клика и состояние
const Hero = ({ onStartClick, isIntroComplete }) => {
    
    // В этом сценарии refs не нужны, так как App.jsx управляет анимацией через querySelector
    
    return (
        <section className="hero scroll-panel">
            <video className="hero-video" autoPlay loop muted playsInline>
                {/* Путь к вашему видео */}
                <source src="/background-main.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео тег.
            </video>
            <h1 className="hero-title serif-accent">
                Zero Limits
            </h1>
            
            {/* КНОПКА: Показываем, только если интро НЕ завершено */}
            {!isIntroComplete && (
                <button 
                    onClick={onStartClick} 
                    className="start-button ui-control-text"
                >
                    Начать
                </button>
            )}
        </section>
    );
};

// ПРАВИЛЬНЫЙ ЭКСПОРТ
export default Hero;