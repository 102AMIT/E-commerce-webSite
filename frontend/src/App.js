import React from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Home from "./components/Home/Home.js";

function App() {
  // Load Roboto font from Google Fonts API using webfontloader package we don't need to add in index.html
  React.useEffect(() => {
    webFont.load(
      {
        google: {
          families: ["Roboto:300,400,500,700", "sans-serif"],
        },
      },
      []
    );
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
