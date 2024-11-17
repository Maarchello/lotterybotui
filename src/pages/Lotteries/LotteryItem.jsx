import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Collapse, Typography} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getInvoiceLink} from "../../service/LotteryService.js";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import '../../App.css';
const LotteryItem = ({lottery}) => {

    const navigate = useNavigate();
    const {tg, user} = useTelegram();


    const onInvestHandler = () => {
        getInvoiceLink(lottery.id, user?.id, 1, (link) => {
            tg.openInvoice(link);
        })
    }

    let endDate = lottery.endDate;

    return (
        <div>
            <Card>

                <CardContent>
                    <Typography gutterBottom component="div">
                        {lottery.name}
                    </Typography>
                    <Typography  sx={{
                        fontSize: 25,
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "flex-start",

                    }} color="text.secondary">
                        ⭐: {lottery.totalInvested}

                    </Typography>
                    <Typography  sx={{
                        fontSize: 25,
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "flex-start",

                    }} color="text.secondary">
                        👤: {lottery.countInvestors}
                    </Typography>

                    <CountdownTimer targetDate={endDate} />

                </CardContent>
                <CardActions disableSpacing sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    // 👇 Edit padding to further adjust position
                    p: 0,
                }}>
                    <Button size="small" onClick={onInvestHandler}>Invest</Button>
                    {/*<ExpandMore*/}
                    {/*    expand={expanded}*/}
                    {/*    onClick={handleExpandClick}*/}
                    {/*    aria-expanded={expanded}*/}
                    {/*    aria-label="show more">*/}

                    {/*    <ExpandMoreIcon />*/}
                    {/*</ExpandMore>*/}

                </CardActions>
                {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <Typography paragraph>*/}
                {/*            <div dangerouslySetInnerHTML={{__html: restaurant.discount}}></div>*/}
                {/*        </Typography>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}

            </Card>
        </div>
    );
};

export default LotteryItem;