// src/components/Section.jsx

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'; // ДОБАВЛЕН useState
import { gsap } from 'gsap';
import './Section.css'; 
import './Modal.css'; // НОВЫЙ ИМПОРТ

// --- НОВЫЙ КОМПОНЕНТ: Модальное окно с биографией ---
const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null; // Если сотрудника нет, не отображаем

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-header">
                    <img src={employee.imageUrl} alt={employee.name} className="modal-image" />
                    <h2>{employee.name}</h2>
                    <p className="modal-title">{employee.title}</p>
                </div>
                <div className="modal-body">
                    <h3>Bio:</h3>
                    <p>{employee.bio}</p>
                </div>
            </div>
        </div>
    );
};
// -----------------------------------------------------

// --- ОБНОВЛЕННЫЙ КОМПОНЕНТ КАРТОЧКИ ---
const EmployeeCard = ({ name, title, imageUrl, onClick }) => (
    // Добавлен обработчик клика
    <div className="employee-card" onClick={onClick}>
        <div className="card-image-wrapper">
            <img src={imageUrl} alt={name} className="card-image" />
            <div className="neon-border"></div>
        </div>
        <h3 className="card-name">{name}</h3>
        <p className="card-title">{title}</p>
    </div>
);
// ---------------------------------------

const HallSection = forwardRef((props, ref) => {
    const contentRef = useRef(null);
    // СОСТОЯНИЕ: хранит данные сотрудника, которого нужно показать в модальном окне
    const [selectedEmployee, setSelectedEmployee] = useState(null); 
    
    // ДОБАВЛЕНА КРАТКАЯ БИОГРАФИЯ
    const employees = [
        { 
            name: "Alex", 
            title: "Frontend Developer", 
            imageUrl: "/frontend-dev.jpg",
            bio: "Alex is the core architect of our interfaces, specializing in React and GSAP. His passion for smooth, performance-driven user experiences ensures every interaction is flawless and intuitive."
        },
        { 
            name: "Victoria", 
            title: "HR Manager", 
            imageUrl: "/hr-png.jpg",
            bio: "Victoria is the guardian of our corporate culture, ensuring we attract and retain top talent. She manages the collective's well-being and drives our diversity and inclusion initiatives."
        },
        { 
            name: "Ivan", 
            title: "Rust Developer", 
            imageUrl: "/rust-devolper.jpg",
            bio: "Ivan builds high-performance, low-latency backends using Rust. His expertise in systems programming is the backbone of our 'Zero Limits' capability, ensuring speed and reliability."
        },
    ];
    
    // Функция для открытия модального окна
    const handleCardClick = (employee) => {
        setSelectedEmployee(employee);
        // Запретить скролл страницы, пока открыто модальное окно
        document.body.style.overflow = 'hidden'; 
    };

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setSelectedEmployee(null);
        // Восстановить скролл
        document.body.style.overflow = 'hidden'; // Скролл должен быть скрыт, т.к. App.jsx его скрывает
    };

    useImperativeHandle(ref, () => ({
        animateIn: () => {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            );
            
            gsap.fromTo(".employee-card", 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)", stagger: 0.2, delay: 1 } 
            );
        }
    }));
    
    useEffect(() => {
        gsap.set(contentRef.current, { opacity: 0 });
    }, []);

    return (
        <section className="hall-section" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div ref={contentRef} className="hall-content">
                
                <h1 className="hall-title">OUR TEAM</h1>
                <p className="hall-subtitle">ENGINEERING THE FUTURE</p> 

                <div className="employee-cards-container">
                    {employees.map((employee, index) => (
                        <EmployeeCard 
                            key={index}
                            name={employee.name}
                            title={employee.title}
                            imageUrl={employee.imageUrl}
                            // Передаем функцию, которая откроет модальное окно с данными этого сотрудника
                            onClick={() => handleCardClick(employee)}
                        />
                    ))}
                </div>
                
            </div>
            
            {/* ДОБАВЛЯЕМ МОДАЛЬНОЕ ОКНО */}
            <EmployeeModal employee={selectedEmployee} onClose={handleCloseModal} />

        </section>
    );
});

export default HallSection;