// src/App.jsx

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import './App.css'; 
import Hero from './components/Hero'; 
import HallSection from './components/Section'; 

function App() {
    const scrollWrapperRef = useRef();
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    
    // --- Функция, запускаемая по клику на "Начать" ---
    const startExperience = () => {
        const container = scrollWrapperRef.current;
        if (!container) return;
        
        // Сдвиг на -100vw, чтобы перейти на Секцию 2 (HallSection)
        const targetX = "-100vw"; 
        
        const tl = gsap.timeline({
            onComplete: () => {
                // ✅ ИЗМЕНЕНИЕ: Просто устанавливаем состояние, чтобы убрать кнопку.
                // Вся логика, включающая вертикальный скролл (document.body.style), УДАЛЕНА.
                setIsIntroComplete(true);
            }
        });

        const heroVideo = container.querySelector('.hero-video');
        const heroTitle = container.querySelector('.hero-title');

        if (heroVideo && heroTitle) {
            tl.to(heroVideo, { scale: 1.2, duration: 1.5, ease: "power2.inOut" }, 0)
              .to(heroTitle, { opacity: 0, y: -50, duration: 1, ease: "power1.out" }, 0);
        }

        // Анимация: Горизонтальный сдвиг на Секцию 2.
        tl.to(container, {
            x: targetX, 
            duration: 2.5, 
            ease: "power2.inOut"
        }, 0.5); 
    };

    return (
        <div className="main-app-container">
            {/* ГЛАВНЫЙ КОНТЕЙНЕР ДЛЯ ГОРИЗОНТАЛЬНОЙ ПРОКРУТКИ */}
            <div ref={scrollWrapperRef} className="horizontal-scroll-wrapper">
                
                {/* 1. ПЕРВАЯ "КАРТИНА" (Hero) */}
                <Hero onStartClick={startExperience} isIntroComplete={isIntroComplete} /> 
                
                {/* 2. ВТОРАЯ "КАРТИНА" (Hall of Zero Limits) */}
                <HallSection />
                
                {/* ✅ УДАЛЕНО: ТРЕТЬЯ "КАРТИНА" */}
                
            </div>
            
            {/* ✅ УДАЛЕНО: ВЕСЬ КОНТЕНТ, КОТОРЫЙ ПОЯВЛЯЛСЯ ПОСЛЕ ВКЛЮЧЕНИЯ СКРОЛЛА */}
            
        </div>
    );
}

export default App;