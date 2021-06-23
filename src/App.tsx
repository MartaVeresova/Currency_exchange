import React from 'react';
import s from './App.module.css';
import {CurrencyExchangeContainer} from './CurrencyExchangeContainer';

function App() {
    return (
        <div className={s.container}>
            <CurrencyExchangeContainer/>
        </div>
    );
}

export default App;
