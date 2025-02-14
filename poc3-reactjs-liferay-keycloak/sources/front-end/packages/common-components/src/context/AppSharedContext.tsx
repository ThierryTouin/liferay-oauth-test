import React, { createContext, useContext, useState, ReactNode } from 'react';
import {AppSharedContextProps } from '../models/AppSharedContextProps'
import { AppSharedContextParams } from '../models/AppSharedContextParams'


const AppSharedContext = createContext<AppSharedContextProps | undefined>(undefined);

export const useAppSharedContext = () => {
  const context = useContext(AppSharedContext);
  if (!context) {
    throw new Error('useAppSharedContext must be used within an AppSharedProvider');
  }
  return context;
};

export const AppSharedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appSharedContextParams, setAppSharedContextParams] = useState<AppSharedContextParams>({
    firstName: '',
    lastName: '',
    email: '',
    accessToken: ''
  });

  return (
    <AppSharedContext.Provider value={{ appSharedContextParams, setAppSharedContextParams }}>
      {children}
    </AppSharedContext.Provider>
  );
};