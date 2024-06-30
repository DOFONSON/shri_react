import React from 'react';
import { Providers } from './providers'; // Adjust the path as necessary

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
