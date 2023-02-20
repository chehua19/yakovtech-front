import React from 'react';
import { Stack, styled } from '@mui/material';
import Canvas from './components/Canvas';
import MainPage from './pages/MainPage/Main';

import './App.css';

const FrontTable = styled(Stack)(() => ({
  width: "calc(100% - 20px)",
  height: "calc(100% - 20px)",
  backgroundColor: "black",
  position: "absolute",
  zIndex: 2,
  left: "10px",
  top: "10px"
}));

function App() {
  return (
    <div className='main' >
     <Canvas style={{ height: '100%', width: '100%'}}/>
     <FrontTable direction="column" justifyContent="center" alignItems="center">
      <MainPage />
     </FrontTable>
    </div>
  );
}

export default App;
