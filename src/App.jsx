import { useState } from 'react'

import './App.css'
import {ThemeProvider} from "@mui/material";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ThemeProvider></ThemeProvider>

    </div>
  )
}

export default App
