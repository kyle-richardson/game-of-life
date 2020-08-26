import React, { useState } from 'react';
import Main from './components/Main'
import Header from './components/Header'
import Footer from "./components/Footer"
import { useDarkMode } from "./utils/useDarkMode"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
  // const [darkMode, setDarkMode] = useDarkMode()
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  const [darkMode, setDarkMode] = useDarkMode();
  const palletType = darkMode ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    }
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App" >
        <Header toggleDarkMode={toggleDarkMode} />
        <Main />
        <Footer />
      </div >
    </ThemeProvider>
  );
}

export default App;
