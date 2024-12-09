import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {getCurrentProfile} from "../../service/ProfileService.js";
import {getThemeColor} from "../../service/ThemeService.js";

const ProfilePage = () => {

    let colorScheme = getThemeColor();
    let profileLogo = colorScheme === 'dark' ? 'logo-def-b.png' : 'logo-def-w.png';
    let timecoinLogo = colorScheme === 'dark' ? 'timecoin-b.png' : 'timecoin-w.png';

    const [profile, setProfile] = useState({});

    useEffect(() => {
        getCurrentProfile((data) => {
            setProfile(data);
        })
    }, []);

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative"
                }}>
                {/* Баланс клиента */}
                <Box
                    sx={{
                        position: "relative",
                        top: 16,
                        left: 16,
                        width: 100
                    }}>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="h4" sx={{ width: 45, height: 45, mr: 1 }}>🎫</Typography>
                        <Typography variant="h5">{profile?.tickets || '0'}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Box
                            component="img"
                            src={timecoinLogo}
                            alt="TC"
                            sx={{ width: 45, height: 45, mr: 1 }}
                        />
                        <Typography variant="h5">{profile?.timecoins || '0'}</Typography>
                    </Box>
                </Box>

                {/*/!* Иконка в центре *!/*/}
                {/*<Box display="flex"*/}
                {/*    component="img"*/}
                {/*    src={profileLogo}*/}
                {/*    alt="profile logo"*/}
                {/*    sx={{ width: "100%", height: 400 }}*/}
                {/*/>*/}
                {/*<Typography variant="body1">@{profile?.username}</Typography>*/}

            </Box>

            <Box>
                <Typography>Реферальная ссылка</Typography>

            </Box>
        </div>

    );
};

export default ProfilePage;