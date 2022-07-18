import React, { useContext, useState } from "react";

export const StoreContext = React.createContext({
    store: undefined,
    setStore: async (key) => null,
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState({});

    const _setStore = (key, value) => {
        const newStore = { ...store };
        newStore[key] = value;
        setStore(newStore);
    };

    return (
        <StoreContext.Provider value={{ store, setStore: _setStore }}>
            {children}
        </StoreContext.Provider>
    );
};
