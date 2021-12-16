import React from 'react';
import './App.css';
import Form from '../Form/Form.jsx';
import Items from '../Items/Items.jsx';
import FilterButtonGrupp from '../filterButtonGrupp/filterButtonGrupp';

function App() {
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <Form />
      <FilterButtonGrupp />
      <Items />
    </div>
  );
}

export default App;
