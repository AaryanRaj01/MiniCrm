import React, { createContext, useState } from 'react';

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export default NameContext;
