import {useEffect, useState} from 'react'

import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useTelegram} from "./hooks/useTelegram.js";
import Header from "./components/Header/Header.jsx";

function App() {
    const {tg, onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    const theme = createTheme({
        palette: {
            mode: tg.colorScheme,
        },
    })

  return (
    <div>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {/*<Header/>*/}

          <div>Асаламу алэйкум, миллиардеры</div>
      </ThemeProvider>

    </div>
  )
}

export default App
