import React, { createContext, useContext, useState } from 'react';

const DEFAULT_SETTINGS = { city: 'Минск', email: '', units: 'C' };

// 1. Создание контекста
const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    const updateSettings = (patch) => setSettings((prev) => ({ ...prev, ...patch }));
    const resetSettings = () => setSettings(DEFAULT_SETTINGS);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const ctx = useContext(SettingsContext);
    if (!ctx) {
        throw new Error('useSettings должен вызываться внутри SettingsProvider');
    }
    return ctx;
}
