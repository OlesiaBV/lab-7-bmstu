import React from 'react';
import Count from './components/Count';
import Hello from './components/Hello';
import Query from './components/Query';
import './styles.css';

function App() {
    return (
        <div className="app-container">
            <h1>Интерфейс для взаимодействия с микросервисами</h1>
            <div className="services">
                <Count />
                <Hello />
                <Query />
            </div>
        </div>
    );
}

export default App;
