// src/components/Section.jsx

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import './Section.css'; // Импортируем стили для этой секции

// Используем forwardRef, чтобы App.jsx мог получить ссылку (ref) на этот компонент
const HallSection = forwardRef((props, ref) => {
    const contentRef = useRef(null);

    // Предоставляем функцию, чтобы App.jsx мог запустить анимацию появления
    useImperativeHandle(ref, () => ({
        // Анимация, которую вызывает App.jsx, когда sceneState меняется на 'hall'
        animateIn: () => {
            gsap.fromTo(contentRef.current, 
                // Начальное состояние (за экраном или невидимое)
                { opacity: 0, y: 50 }, 
                // Конечное состояние (появляется и сдвигается вверх)
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            );
        }
    }));
    
    // Начальное скрытие контента при монтировании, 
    // чтобы анимация "animateIn" могла его показать
    useEffect(() => {
        gsap.set(contentRef.current, { opacity: 0 });
    }, []);

    return (
        // Располагаем компонент абсолютно, чтобы он занимал весь экран
        <section className="hall-section" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div ref={contentRef} className="hall-content">
                <h1 style={{color: 'white', fontSize: '3em'}}>СЦЕНА 2: НОВАЯ ГЛАВА</h1>
                <p style={{color: 'lightgray'}}>Добро пожаловать. Это контент, который появляется после анимационного перехода с первого экрана.</p>
                {/* Добавьте здесь остальной контент вашей второй сцены */}
            </div>
        </section>
    );
});

export default HallSection;