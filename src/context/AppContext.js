import React from 'react';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {

    const onSubmitEmail = () => console.log('work');
    return (
        <AppContext.Provider
            value={{
            onSubmitEmail}}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;

export { AppProvider };