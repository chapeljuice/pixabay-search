import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import './App.scss';

library.add( faCircleNotch );


function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default App;
