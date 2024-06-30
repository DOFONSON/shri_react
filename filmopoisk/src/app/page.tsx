import React from 'react';
import { Providers } from './providers'; 
import Header from '../components/Header/Header';

const HomePage = async () => {
  // Здесь вы можете выполнять серверные запросы
  const token = null; // Fetch token or any other data as necessary

  // Предзаполните начальное состояние Redux
  const initialReduxState = {
    auth: {
      token,
    },
  };

  return (
    <Providers initialReduxState={initialReduxState}>
      <Header />
      {/* Other components or content */}
    </Providers>
  );
};

export default HomePage;
