import React, { useState } from 'react';
import axios from 'axios';

function Query() {
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');

    const getQueryResponse = async () => {
        try {
            const result = await axios.get(`http://localhost:8083/api/user?name=${name}`);
            setResponse(result.data); // Получаем ответ с персонализированным сообщением
        } catch (error) {
            setResponse('Ошибка: Неверный параметр');
        }
    };

    return (
        <div className="service-card">
            <h2>Query микросервис</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                />
                <button onClick={getQueryResponse}>Получить ответ</button>
            </div>
            <p>Ответ: <strong>{response}</strong></p>
        </div>
    );
}

export default Query;
