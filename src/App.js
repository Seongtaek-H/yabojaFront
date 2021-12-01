import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Join from './routes/Join';
import Login from "./routes/Login";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/join" element={<Join />}/>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;