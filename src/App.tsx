import React, { useState } from 'react';
import './App.css';
import { PokeSearch } from './components/PokeSearch';

function App() {

  //eslint-disable-next-line
  const [val, setVal] = useState<string>("")
  

  return (
    <div className="App">
      <PokeSearch name="John Doe" numberOfPokemons={7} handleSearch={(e) => setVal(e.target.value)} />
      
      <br/>
    </div>
  );
}

export default App;
