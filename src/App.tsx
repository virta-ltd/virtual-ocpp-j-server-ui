import React from 'react';
import './App.css';
import Home from './components/Home';
import { StationProvider } from './context/StationContext';

export default function () {
  return (
    <StationProvider>
      <Home />
    </StationProvider>
  );
}
