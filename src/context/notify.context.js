import { createContext, useState, useContext } from 'react';

export const NotifyContext = createContext();

export const NotifyContextProvider = ({ children }) => {
    const [notification, setNotification] = useState("");

    return (
        <NotifyContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotifyContext.Provider>
    )
}

export const useNotifyContext = () => {
    const context = useContext(NotifyContext);

    if (context === undefined) {
        throw new Error('useNotifyContext must be used within a NotifyContextProvider');
    }

    return context;
}
