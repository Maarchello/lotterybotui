import React, {useEffect, useState} from 'react';
import {Box, Button, Link, Typography} from "@mui/material";
import {getCurrentProfile} from "../../service/ProfileService.js";
import {getThemeColor} from "../../service/ThemeService.js";
import {getSubscriptionPlanInvoiceLink} from "../../service/ShopService.js";
import {useTelegram} from "../../hooks/useTelegram.js";

const ProfilePage = () => {

    const {tg, user} = useTelegram();

    let colorScheme = getThemeColor();
    let profileLogo = colorScheme === 'dark' ? 'logo-def-b.png' : 'logo-def-w.png';
    let timecoinLogo = colorScheme === 'dark' ? 'timecoin-b.png' : 'timecoin-w.png';

    const [profile, setProfile] = useState({});

    const onBuyIntent = (subscriptionPlan) => {
        getSubscriptionPlanInvoiceLink(subscriptionPlan, user?.id, (link) => {
            tg.openInvoice(link)
        })
    }

    useEffect(() => {
        getCurrentProfile((data) => {
            setProfile(data);
        })
    }, []);

    return (
        <div className="container">
            <Box
                sx={{

                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#1E1E1E"
                }}>
                {/* Баланс клиента */}
                <Box
                    sx={{

                    }}>
                    <Typography sx={{backgroundColor: "#3a3939"}}>balance:</Typography>
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

            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#1E1E1E"
                }}>

                <Button sx={{
                    padding: "10px",
                    backgroundColor: "#3a3939"
                }}>
                    <Typography>

                        <Link href={encodeURI('https://t.me/share/url?url=https://t.me/BillionairesLottery_bot&text=Don’t miss the Billionaires Lottery and become a new billionaire!')}
                              underline="none">
                            Send referral link
                        </Link>
                    </Typography>
                </Button>
            </Box>


            {/* Subscription plan */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#1E1E1E",
                    maxHeight: "50vh",
                    overflow: "auto"
                }}>

                <Box
                    sx={{
                        marginBottom: "15px"
                    }}>
                    <Typography sx={{backgroundColor: "#3a3939"}}>subscription plan: {profile?.subscriptionPlan || 'BASIC'}</Typography>
                </Box>

                <Button sx={{

                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#3a3939"
                }} onClick={() => onBuyIntent('DEVELOPER')}>
                    <Typography>Switch to DEVELOPER plan<br/>(15.000 ⭐ per month)</Typography>
                </Button>
                <Button sx={{

                    padding: "10px",
                    backgroundColor: "#3a3939"
                }} onClick={() => onBuyIntent('CO_FOUNDER')}>
                    <Typography>Switch to CO-FOUNDER plan<br/>(50.000 ⭐ per month)</Typography>
                </Button>

            </Box>
        </div>

    );
};

export default ProfilePage;