import React, { createContext, useContext, useState } from 'react';

export type LanguageMode = 'am' | 'en' | 'ge' | 'ti';
export type DesignAssumption = 'assumption-1' | 'assumption-2';

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  designAssumption: DesignAssumption;
  setDesignAssumption: (assumption: DesignAssumption) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  selectedChapter: number;
  setSelectedChapter: (num: number) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('eotc_language') as LanguageMode | null;
    return saved || 'en';
  });

  const setLanguage = (lang: LanguageMode) => {
    setLanguageState(lang);
    localStorage.setItem('eotc_language', lang);
  };
  const [designAssumption, setDesignAssumption] = useState<DesignAssumption>('assumption-1');
  const [activeView, setActiveView] = useState<string>('home');
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>('john');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        designAssumption,
        setDesignAssumption,
        activeView,
        setActiveView,
        activeTrackId,
        setActiveTrackId,
        selectedBookId,
        setSelectedBookId,
        selectedChapter,
        setSelectedChapter,
        isAuthOpen,
        setIsAuthOpen,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
