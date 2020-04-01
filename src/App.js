import React from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

import './App.css';

function App() {
  return (
    <div className="App">
        <Customerlist />
        <Traininglist />
    </div>
  );
}

export default App;
