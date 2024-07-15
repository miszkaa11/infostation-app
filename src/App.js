// src/App.js
import React from 'react';
// Reset Scss
import './App.scss';
// Scss
import './assets/scss/Main.scss';
// Clock
import Clock from './components/Clock/Clock';
// Weather
import Weather from './components/Weather/Weather';
// To-Do
import ToDo from './components/ToDo';
// NotePad
import Notepad from './components/NotePad';

function App() {
  return (
      <div className="InfoStation p-2">
          <Clock/>
          <Weather/>
          <ToDo/>
          <Notepad/>
      </div>
  );
}

export default App;
