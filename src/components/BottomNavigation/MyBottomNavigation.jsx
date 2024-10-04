import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";

const MyBottomNavigation = () => {
    const [value, setValue] = useState('Lotteries');

    let navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{width: "100%", position: "absolute", bottom: 0}}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction value="Lotteries" label="Lotteries" icon={<EmojiEventsIcon/>}
                                    onClick={() => navigate("/")} />

            <BottomNavigationAction value="Games" label="Games" icon={<SportsEsportsIcon/>}
                                    onClick={() => navigate("/games")}/>
            <BottomNavigationAction value="Profile" label="Profile" icon={<AccountCircleIcon/>}
                                    onClick={() => navigate("/profile")}/>
        </BottomNavigation>
    );
}

export default MyBottomNavigation;