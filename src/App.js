import React from 'react';
import './App.css';
import Giphy from './components/Giphy';

function App() {
  return (
    <div className='main-root'>
      <h2 className='Giphy'>Giphy Project</h2>
      <hr />
      <Giphy />
    </div>
  );
}

export default App;
