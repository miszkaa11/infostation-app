// src/App.js
import React from 'react';
// Scss
import './App.scss';
import './assets/scss/Main.scss';
// Clock
import Clock from './components/Clock';
// Weather
import Weather from './components/Weather';
// To-Do
import ToDo from './components/ToDo';
// NotePad
import Notepad from './components/NotePad';

function App() {
  return (
      <div className="App">
          <Clock />
          <Weather />
          <ToDo />
          <Notepad />
      </div>
  );
}

export default App;
