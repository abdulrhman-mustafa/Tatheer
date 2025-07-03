// src/context/SearchContext.tsx

'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

<<<<<<< HEAD
=======
// Define the shape of the context value
>>>>>>> dc5882a (create the header)
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

<<<<<<< HEAD
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
=======
// Create the SearchContext with undefined as default
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component that wraps parts of the app that need search functionality
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
>>>>>>> dc5882a (create the header)

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

<<<<<<< HEAD
=======
// Custom hook to access the SearchContext
>>>>>>> dc5882a (create the header)
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
