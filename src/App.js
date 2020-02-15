import React from 'react';
import { AppProvider } from "./context/AppContext"
import RouterComponent from "./router/Router";

function App() {
  return (
      <AppProvider>
          <RouterComponent/>
      </AppProvider>
  );
}

export default App;
