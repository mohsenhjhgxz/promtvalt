import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages, translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('pv_lang') || 'en';
  });

  const activeLangConfig = languages.find(l => l.code === currentLang) || languages[0];

  useEffect(() => {
    localStorage.setItem('pv_lang', currentLang);
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', activeLangConfig.dir);
  }, [currentLang, activeLangConfig]);

  const t = (key, params = {}) => {
    const langDict = translations[currentLang] || translations.en;
    let text = langDict[key] || translations.en[key] || key;

    // Replace {placeholder} params
    Object.keys(params).forEach(pKey => {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), params[pKey]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{
      currentLang,
      setLanguage: setCurrentLang,
      activeLangConfig,
      languages,
      t,
      isRTL: activeLangConfig.dir === 'rtl'
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
