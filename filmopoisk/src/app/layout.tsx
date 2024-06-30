import React from 'react';
import './globals.css'
import { Providers } from './providers'; 
import Header from '../components/Header/Header';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="./globals.css" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
