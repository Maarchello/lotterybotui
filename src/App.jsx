import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MyBottomNavigation from "./components/BottomNavigation/MyBottomNavigation.jsx";
import {Route, Routes} from "react-router-dom";
import LotteriesPage from "./pages/Lotteries/LotteriesPage.jsx";
import GamesPage from "./pages/Games/GamesPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";

function App() {
    // const {tg, onToggleButton} = useTelegram();

    // useEffect(() => {
    //     tg.ready();
    // }, []);

    const theme = createTheme({
        palette: {
            mode: 'dark',
            // mode: tg.colorScheme,
        },
    })

  return (
    <div>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {/*<Header/>*/}

          <MyBottomNavigation />

          <Routes>
              <Route index element={<LotteriesPage/>} />
              <Route path={'games'} element={<GamesPage/>} />
              <Route path={'profile'} element={<ProfilePage/>} />
          </Routes>
      </ThemeProvider>

    </div>
  )
}

export default App
