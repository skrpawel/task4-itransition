import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
// import Register from "./components/Register";
// import Login from './components/Login';
import Main from "./components/Main";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoutes from "./components/ProtectedRoutes";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin_panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
