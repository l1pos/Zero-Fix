// src/components/ExtraSection.jsx

import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './ExtraSection.css'; 

gsap.registerPlugin(ScrollTrigger);

const ExtraSection = forwardRef((props, ref) => {
    const sectionRef = ref; 
    const titleRef = useRef(null);
    
    useEffect(() => {
        const container = sectionRef.current;
        if (!container) return;
        
        // Анимация текста при прокрутке секции
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom", // Начинаем, когда секция появляется снизу
                end: "center center", // Заканчиваем, когда секция в центре
                scrub: true,
            }
        })
        .fromTo(titleRef.current, {
            opacity: 0, 
            y: 50,
            scale: 0.8
        }, {
            opacity: 1, 
            y: 0, 
            scale: 1,
            ease: "none"
        }, 0);
        
        // Добавляем небольшой эффект затухания, когда секция уходит
        gsap.to(titleRef.current, {
            opacity: 0.5,
            scrollTrigger: {
                trigger: container,
                start: "center center",
                end: "bottom top",
                scrub: true
            }
        });

    }, []);
    
    return (
        <section ref={sectionRef} className="extra-section-wrapper">
            <h2 ref={titleRef} className="extra-section-title">
                ...РАСШИРЕНИЕ ГОРИЗОНТОВ...
            </h2>
        </section>
    );
});

export default ExtraSection;