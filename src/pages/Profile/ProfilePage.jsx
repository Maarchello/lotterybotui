import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram.js";
import {getCurrentProfile} from "../../service/ProfileService.js";

const ProfilePage = () => {
    const {tg} = useTelegram();
    let colorScheme = tg.colorScheme
    let profileLogo = colorScheme === 'dark' ? 'logo-def-b.png' : 'logo-def-w.png';
    let timecoinLogo = colorScheme === 'dark' ? 'timecoin-b.png' : 'timecoin-w.png';

    const [profile, setProfile] = useState({
        timecoins: 0,
        tickets: 0
    });

    useEffect(() => {
        getCurrentProfile((data) => {
            setProfile(data);
        })
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            {/* Баланс клиента */}
            <Box
                sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                }}
            >
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="h4" sx={{ width: 45, height: 45, mr: 1 }}>🎫</Typography>
                    <Typography variant="h5">{profile?.tickets}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={1}>
                    <Box
                        component="img"
                        src={timecoinLogo}
                        alt="TC"
                        sx={{ width: 45, height: 45, mr: 1 }}
                    />
                    <Typography variant="h5">{profile?.timecoins}</Typography>
                </Box>
            </Box>

            {/* Иконка в центре */}
            <Box
                component="img"
                src={profileLogo}
                alt="profile logo"
                sx={{ width: 350, height: 350 }}
            />
            <Typography variant="body1">@{profile?.username}</Typography>

        </Box>
    );
};

export default ProfilePage;