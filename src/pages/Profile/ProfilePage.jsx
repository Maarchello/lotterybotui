import React, {useEffect, useState} from 'react';
import {Box, Button, Collapse, IconButton, Link, Typography} from "@mui/material";
import {getCurrentProfile} from "../../service/ProfileService.js";
import {getThemeColor} from "../../service/ThemeService.js";
import {getSubscriptionPlanInvoiceLink} from "../../service/ShopService.js";
import {useTelegram} from "../../hooks/useTelegram.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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

    const [expandedSubscriptionPlan, setExpandedSubscriptionPlan] = useState(null);

    const handleToggle = (subscriptionPlan) => {
        setExpandedSubscriptionPlan(expandedSubscriptionPlan === subscriptionPlan ? null : subscriptionPlan);
    };

    useEffect(() => {
        getCurrentProfile((data) => {
            setProfile(data);
        })
    }, []);

    return (
        <div className="container">
            <Typography display="flex" alignItems="center">balance:</Typography>
            <Box
                sx={{

                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    padding: "10px",
                    marginBottom: "20px",
                    backgroundColor: "#1E1E1E"
                }}>
                {/* Баланс клиента */}
                <Box
                    sx={{

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

            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    padding: "10px",
                    marginBottom: "20px",
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
            <Typography display="flex" alignItems="center">subscription plan: {profile?.subscriptionPlan || 'BASIC'}</Typography>
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

                <Box sx={{marginBottom: "10px"}}>
                    <Button sx={{
                        borderRadius: 0,
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#3a3939"
                    }} onClick={() => onBuyIntent('DEVELOPER')}>
                        <Typography>Switch to DEVELOPER plan<br/>(15.000 ⭐ per month)</Typography>
                        <IconButton onClick={() => handleToggle('DEVELOPER')}>
                            {expandedSubscriptionPlan === 'DEVELOPER' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Button>

                    <Collapse sx={{marginBottom: "10px", backgroundColor: "#3a3939"}} in={expandedSubscriptionPlan === 'DEVELOPER'} timeout="auto" unmountOnExit>
                        <Box sx={{padding:"10px"}}>
                            <Typography variant="body2">+ 3% chance of winning per lottery</Typography>
                            <Typography variant="body2">+ Increased timecoin rewards</Typography>
                            <Typography variant="body2">+ Increased f-tickets rewards</Typography>
                        </Box>
                    </Collapse>
                </Box>


                <Box>
                    <Button sx={{
                        borderRadius: 0,
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#3a3939"
                    }} onClick={() => onBuyIntent('CO_FOUNDER')}>
                        <Typography>Switch to CO-FOUNDER plan<br/>(50.000 ⭐ per month)</Typography>
                        <IconButton onClick={() => handleToggle('CO_FOUNDER')}>
                            {expandedSubscriptionPlan === 'DEVELOPER' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Button>

                    <Collapse sx={{backgroundColor: "#3a3939"}} in={expandedSubscriptionPlan === 'CO_FOUNDER'} timeout="auto" unmountOnExit>
                        <Box sx={{padding:"10px"}}>
                            <Typography variant="body2">+ DEVELOPER plan included</Typography>
                            <Typography variant="body2">+ 7% chance of winning per lottery</Typography>
                            <Typography variant="body2">+ Winning chances calculator</Typography>
                            <Typography variant="body2">+ Total investors per lottery viewer</Typography>
                        </Box>
                    </Collapse>
                </Box>


            </Box>
        </div>

    );
};

export default ProfilePage;