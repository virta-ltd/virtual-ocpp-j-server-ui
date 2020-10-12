import React from 'react';
import './App.css';
import Home from './components/Home';
import { OperationContextProvider } from './context/OperationContext';
import { StationContextProvider } from './context/StationContext';

export default function () {
  return (
    <StationContextProvider>
      <OperationContextProvider>
        <Home />
      </OperationContextProvider>
    </StationContextProvider>
  );
}
