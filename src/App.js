import React, { useState, useEffect } from "react";
import Header from "./Header";
import Consulta from "./Consulta";
import axios from "axios";

function App() {
  return (
    <div>
      <Header />
      <Consulta />
    </div>
  );
}

export default App;
