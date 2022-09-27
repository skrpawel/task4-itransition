import { render } from "react-dom";
import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import Login from './components/Login';
import AdminPanel from "./components/AdminPanel";
import ProtectedRoutes from "./components/ProtectedRoutes";


const App = () => {

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div><Register /><Login /></div>} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin_panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default App;
