import React from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SocketProvider from "./context/socketContext"





const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider  clientId="55126529101-h8gkfee16h024hias0p4rt8gk9344kha.apps.googleusercontent.com">
    <BrowserRouter>
    <SocketProvider  >
      <MainRouter />
      </SocketProvider>
    </BrowserRouter>
    <Toaster />
    </GoogleOAuthProvider>
    </PersistGate>
      </Provider>
    </>
  );
}

export default App;
