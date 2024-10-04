import {useEffect, useState} from 'react'

import './App.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {useTelegram} from "./hooks/useTelegram.js";

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
          <div>Асаламу алэйкум, миллиардеры</div>
      </ThemeProvider>

    </div>
  )
}

export default App
