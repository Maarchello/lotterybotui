import React, {useEffect, useState} from 'react';
import {Box, Card, CardActions, Grid, Typography} from "@mui/material";
import Button from "../../components/Button/Button.jsx";

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {getCurrentProfile} from "../../service/ProfileService.js";
import {getThemeColor} from "../../service/ThemeService.js";
import {getInvoiceLink} from "../../service/LotteryService.js";

const ShopPage = () => {

    let colorScheme = getThemeColor();

    const onBuyIntent = () => {

    }

    return (
        <div className="container">
            <Box
               >

                <Card sx={{padding: "15px", marginBottom: "20px", backgroundColor: "#1E1E1E"}}>
                    <Typography variant="h6" gutterBottom>
                        Subscription plan
                    </Typography>


                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h6">Elite</Typography>
                            </Box>
                        </Grid>

                        <CardActions disableSpacing sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}>
                            <Button size='large' onClick={onBuyIntent}>15000\month⭐</Button>

                        </CardActions>

                    </Grid>

                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h6">VIP</Typography>
                            </Box>
                        </Grid>
                        <CardActions disableSpacing sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}>
                            <Button size='large' onClick={onBuyIntent}>50000\month ⭐</Button>

                        </CardActions>
                    </Grid>
                </Card>

                <Card sx={{padding: "10px", marginBottom: "20px", backgroundColor: "#1E1E1E"}}>
                    <Typography variant="h6" gutterBottom>
                        Boosts
                    </Typography>

                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="body2"><RocketLaunchIcon/> Boost Senior</Typography>
                            </Box>
                        </Grid>

                        <CardActions disableSpacing sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}>
                            <Button size='large' onClick={onBuyIntent}>BUY 50 ⭐</Button>

                        </CardActions>

                    </Grid>

                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="body2"><RocketLaunchIcon/> Boost Middle</Typography>
                            </Box>
                        </Grid>
                        <CardActions disableSpacing sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}>
                            <Button size='large' onClick={onBuyIntent}>BUY 30 ⭐</Button>

                        </CardActions>
                    </Grid>

                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="body2"> <RocketLaunchIcon/> Boost Junior</Typography>
                            </Box>
                        </Grid>
                        <CardActions disableSpacing sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                        }}>
                            <Button size='large' onClick={onBuyIntent}>BUY 10 ⭐</Button>

                        </CardActions>

                    </Grid>
                </Card>
            </Box>
        </div>


    );
};

export default ShopPage;