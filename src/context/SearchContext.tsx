// src/context/SearchContext.tsx

'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// تعريف الواجهة لـ SearchContext
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// إنشاء الـ Context بقيمة افتراضية
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// مكون Provider لتوفير الـ Context
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // حالة البحث الفعلية

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook مخصص لاستخدام الـ Context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
