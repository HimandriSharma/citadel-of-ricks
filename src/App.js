import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Navbar from "./components/Navbar";
import Character from "./components/Character";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Character />} />
          <Route exact path="/characters" element={<Character />} />
          <Route exact path="/characters/:id" element={<Detail />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;