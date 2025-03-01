import React, { useState } from 'react';
import axios from 'axios';

function Count() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null); // Для хранения ошибок

    const getCount = async () => {
        try {
            const response = await axios.get('http://localhost:8081');
            setCount(parseInt(response.data)); // Выводим текущее значение счётчика
        } catch (error) {
            console.error('Ошибка при получении значения Count:', error);
        }
    };

    const updateCount = async () => {
        try {
            await axios.post('http://localhost:8081', `count=${input}`);
            setInput('');
            getCount(); // Получаем обновлённое значение
            setError(null);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);  // Устанавливаем сообщение об ошибке
            } else {
                setError('Ошибка при обновлении счётчика');
            }
        }
    };

    const clearCount = async () => {
        try{
            await axios.delete('http://localhost:8081');
            setCount(0);
            setError(null);
        } catch (error){
            console.error('Ошибка при очистке счетчика:', error);
            setError('Ошибка при очистке счетчика');
        }
    };


//<button onClick={getCount}>Получить текущее значение</button>
    return (
        <div className="service-card">
            <h2>Count микросервис</h2>
            <p>Текущее значение: <strong>{count}</strong></p>
            <div className="input-container">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введите число"
                />
                <button onClick={updateCount}>Обновить Count</button>
            </div>
            <div>
                <button onClick={clearCount}>Очистить Count</button>
            </div>
            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Count;
