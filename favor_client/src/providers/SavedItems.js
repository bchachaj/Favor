import React from 'react';

const Context = React.createContext(null);

const AppContext = ({ children }) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}

export default AppContext; 