import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WavParser from './Components/WavParser'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                YIN Pitch Detection Demo
            </header>
            <WavParser />
        </div>
    );
}

export default App;
