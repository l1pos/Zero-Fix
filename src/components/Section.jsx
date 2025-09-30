// src/components/Section.jsx

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HallSection = () => {
    // 1. ПРАВИЛЬНОЕ ОБЪЯВЛЕНИЕ REFS
    const sectionRef = useRef(null); 
    const titleRef = useRef(null);
    
    useEffect(() => {
        // Проверка: убедиться, что элементы существуют
        if (!sectionRef.current || !titleRef.current) return;
        
        const ctx = gsap.context(() => {
            // Анимация: Выезд текста снизу при появлении секции
            gsap.fromTo(titleRef.current, 
                { y: 100, opacity: 0 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        // Начать, когда левый край секции достигнет центра окна
                        start: "left center", 
                        end: "center center", 
                        scrub: 1, 
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        // 2. ПРИСВОЕНИЕ REFS В JSX
        <section ref={sectionRef} className="hall-section scroll-panel">
            <div className="hall-content-wrapper">
                <h2 ref={titleRef} className="hall-title serif-accent">
                    The Hall of
                </h2>
                <h3 className="hall-title serif-accent" style={{ fontSize: '3rem' }}>
                    Infinite Potential
                </h3>
                <p className="subtitle ui-control-text">
                    Inspired by the great nation of Wakanda.
                </p>
            </div>
        </section>
    );
};

export default HallSection;