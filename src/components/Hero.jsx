// src/components/Hero.jsx

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

// Используем forwardRef для приема ref от родителя (App.jsx)
const Hero = forwardRef(({ onStartClick }, ref) => {
  const headingRef = useRef(null); 
  const videoRef = useRef(null); // Ссылка на видеоэлемент

  // Предоставляем функцию для App.jsx, чтобы запустить анимацию ухода
  useImperativeHandle(ref, () => ({
      startVideoZoomAndExit: () => {
          
          // 1. Анимация: Увеличиваем видео и делаем его прозрачным (эффект "ухода")
          gsap.to(videoRef.current, {
              scale: 2.5, 
              opacity: 0, 
              duration: 2,
              ease: "power2.inOut"
          });
          
          // 2. Анимация: Скрываем все элементы интерфейса
          gsap.to([headingRef.current, ".hero-signature-container", ".start-button"], {
              opacity: 0,
              duration: 0.5,
              ease: "power1.out"
          });

          // 3. Вызываем колбэк для App.jsx (смена сцены) после анимации
          setTimeout(() => {
              onStartClick(); // App.jsx сменит sceneState
          }, 1800); 
      }
  }));

  // Удален useEffect с параллаксом, так как скролла больше нет

  return (
    <section className="hero">
      <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline> 
        <source src="/background-main.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео тег.
      </video>

      <div className="hero-overlay">
        
        {/* ГЛАВНЫЙ ЗАГОЛОВОК, который анимируется */}
        <div ref={headingRef} className="hero-heading"> 
          <div className="line-top">
            <span className="small-the">THE</span>
            <h1 className="big-text">HALL</h1>
            <span className="small-off">OF</span>
          </div>
          <h2 className="big-text bottom-text">ZERO LIMITS</h2>
        </div>

        {/* Кнопка "Enter" */}
        <button 
          // Кнопка вызывает функцию анимации через ref
          onClick={() => ref.current.startVideoZoomAndExit()} 
          className="start-button"
        >
          Enter
        </button>
        
        {/* !!! НОВЫЙ КОНТЕЙНЕР ДЛЯ ЦЕНТРИРОВАНИЯ ПОДПИСИ !!! */}
        <div className="hero-signature-container">
            <div className="hero-signature">
                <img src="/logo-company.png" alt="Company Logo" className="signature-logo" />
                <span className="copyright-text">Ⓒ Out of The Box Systems</span>
            </div>
        </div>
        
      </div> 
    </section>
  );
});

export default Hero;