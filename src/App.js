/* eslint-disable */
import React, { useState } from "react";
import "./App.css";

import Menu from './component/Menu.js';
import Login from './component/Login.js'
import Users from "./component/Users";

function App() {
  return (
    <div>
    <Menu></Menu>
    <Login></Login>
    <Users/>
    </div>
  );
}

export default App;
