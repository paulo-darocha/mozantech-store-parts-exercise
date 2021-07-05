import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import useService from './hooks/useService';
import PartDetail from './partsStore/PartDetail';
import Store from './partsStore/PartsStore';

function App() {
  const { loadParts } = useService();

  useEffect(() => {
    loadParts();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/part/:name" component={PartDetail} />
        <Route path="/" component={Store} />
      </Switch>
    </div>
  );
}

export default App;
