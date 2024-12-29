import React, {useEffect, useState} from 'react';
import {Box, Card, CardActions, Grid, Typography} from "@mui/material";
import Button from "../../components/Button/Button.jsx";
import {getThemeColor} from "../../service/ThemeService.js";
import {getInvoiceLink, getItems} from "../../service/ShopService.js";
import {useTelegram} from "../../hooks/useTelegram.js";

const FaqPage = () => {

    const {tg, user} = useTelegram();
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems((data) => {
            console.log(data)
            setItems(data);
        })
    }, []);

    let colorScheme = getThemeColor();

    const onBuyIntent = (item) => {
        getInvoiceLink(item.id, user?.id, (link) => {
            tg.openInvoice(link)
        })
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
                            <Button size='large' onClick={() => onBuyIntent(null)}>15000\month⭐</Button>

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
                            <Button size='large' onClick={() => onBuyIntent(null)}>50000\month ⭐</Button>

                        </CardActions>
                    </Grid>
                </Card>

                <Card sx={{padding: "10px", marginBottom: "20px", backgroundColor: "#1E1E1E"}}>
                    <Typography variant="h6" gutterBottom>
                        Items
                    </Typography>

                    {items
                        .sort((a, b) => b.price - a.price)
                        .map(item => {
                            return <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                                <Grid item display="flex" alignItems="center">
                                    <Box>
                                        <Typography variant="body2">
                                            {/*<Icon>*/}
                                            {/*    <img src={imag === undefined ? '/undefined.png' : imag} />*/}
                                            {/*</Icon>*/}

                                            {item?.name}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <CardActions disableSpacing sx={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                }}>
                                    <Button size='large' onClick={() => onBuyIntent(item)}>BUY {item?.price} ⭐</Button>

                                </CardActions>

                            </Grid>
                        })}

                </Card>
            </Box>
        </div>


    );
};

export default FaqPage;