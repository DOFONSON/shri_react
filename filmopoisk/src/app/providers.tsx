'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../../store/store';

interface ProvidersProps {
  children: ReactNode;
  initialReduxState?: any;
}

export const Providers: React.FC<ProvidersProps> = ({ children, initialReduxState }) => {
  const store = useStore(initialReduxState);

  return <Provider store={store}>{children}</Provider>;
};
