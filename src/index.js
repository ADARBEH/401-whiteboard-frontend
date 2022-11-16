import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/AuthContext';
import PostontextProvider from './context/PostContext';

import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { myNewTheme } from './theme';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <ChakraProvider theme={myNewTheme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />


    <React.StrictMode>
      <AuthContextProvider>
        <PostontextProvider>
          <App />
        </PostontextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </ChakraProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
