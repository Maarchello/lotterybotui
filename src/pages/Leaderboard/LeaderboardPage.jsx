import React, {useEffect, useState} from 'react';
import {Avatar, Box, Card, Grid, Typography} from "@mui/material";
import {getLeaderboard} from "../../service/LeaderboardService.js";

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const LeaderboardPage = () => {

    const [leaderboard, setLeaderboard] = useState({});

    useEffect(() => {
        getLeaderboard((data) => {
            setLeaderboard(data);
        })
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#121212",
                color: "#fff",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            {/* Общая статистика */}
            <Card sx={{ padding: "20px", marginBottom: "20px", backgroundColor: "#1E1E1E" }}>
                <Typography variant="h6" gutterBottom>
                    Общая статистика
                </Typography>

                <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                    <Grid item display="flex" alignItems="center">
                        <Box>
                            <Typography variant="body2">Всего вложенно</Typography>
                        </Box>
                    </Grid>
                    <Typography>{leaderboard?.totalInvested || 0} ⭐</Typography>
                </Grid>

                <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                    <Grid item display="flex" alignItems="center">
                        <Box>
                            <Typography variant="body2">Всего инвесторов</Typography>
                        </Box>
                    </Grid>
                    <Typography>{leaderboard?.totalInvestors || 0} 👤</Typography>
                </Grid>
            </Card>

            {/* Я */}
            <Card sx={{ padding: "20px", marginBottom: "20px", backgroundColor: "#1E1E1E" }}>
                {/*<Typography variant="h6" gutterBottom>*/}
                {/*    Я*/}
                {/*</Typography>*/}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <Avatar
                            alt={leaderboard?.me?.username}
                            sx={{ width: 40, height: 40, marginRight: "10px" }}
                        />
                        <Typography variant="body2">{leaderboard?.me?.username}</Typography>
                    </Box>
                    <Typography variant="body2">{leaderboard?.me?.count || 0} ⭐</Typography>
                </Box>
            </Card>

            {/* Топ 100 майнеров */}
            <Card sx={{ padding: "20px", backgroundColor: "#1E1E1E" }}>
                <Typography variant="h6" gutterBottom>
                    Top 30 investors
                </Typography>
                <Box>

                {leaderboard?.leaders?.map(item => {

                    return <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Avatar
                                src="notfound"
                                alt={item.username}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    marginRight: "10px",
                                    backgroundColor: getRandomColor(),
                                }}
                            />
                            <Box>
                                <Typography variant="body2">{item.username}</Typography>
                            </Box>
                        </Grid>
                        <Typography>{item.count || 0} ⭐</Typography>
                    </Grid>
                })}

                </Box>
            </Card>
        </Box>
    );
};

export default LeaderboardPage;