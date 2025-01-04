import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MyBottomNavigation from "./components/BottomNavigation/MyBottomNavigation.jsx";
import {Route, Routes} from "react-router-dom";
import LotteriesPage from "./pages/Lotteries/LotteriesPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import {useTelegram} from "./hooks/useTelegram.js";
import {useEffect} from "react";
import {authenticate} from "./service/AuthService.js";
import {getThemeColor} from "./service/ThemeService.js";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage.jsx";
import FaqPage from "./pages/Faq/FaqPage.jsx";

function App() {
    const telegramData = window.Telegram.WebApp.initData || "";

    // if (window.localStorage.getItem("tkn") === null) {
    //     authenticate(telegramData, (token) => {
    //         window.localStorage.setItem("tkn", token)
    //     })
    // }

    authenticate(telegramData, (token) => {
        window.localStorage.setItem("tkn", token)
    })


    const {tg, onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: 'Courier New',
        },
        palette: {
            mode: getThemeColor(),
        },
    })

  return (
    <div className="app">

        <div className="content-holder">
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Routes>
                    <Route index element={<LotteriesPage/>} />
                    <Route path={'lotteries'} element={<LotteriesPage/>} />
                    <Route path={'top'} element={<LeaderboardPage/>} />
                    <Route path={'profile'} element={<ProfilePage/>} />
                    <Route path={'faq'} element={<FaqPage/>} />
                </Routes>

                <MyBottomNavigation />

            </ThemeProvider>
        </div>

    </div>
  )
}

export default App
