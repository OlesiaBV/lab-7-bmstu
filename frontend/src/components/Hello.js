import React, { useState } from 'react';
import axios from 'axios';

function Hello() {
    const [message, setMessage] = useState('');

    const getHello = async () => {
        try {
            const response = await axios.get('http://localhost:8082/get');
            setMessage(response.data); // Получаем сообщение
        } catch (error) {
            console.error('Ошибка при получении сообщения Hello:', error);
        }
    };

    return (
        <div className="service-card">
            <h2>Hello микросервис</h2>
            <p>Сообщение от сервера: <strong>{message}</strong></p>
            <button onClick={getHello}>Получить сообщение</button>
        </div>
    );
}

export default Hello;
