import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Collapse, Typography} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getInvoiceLink} from "../../service/LotteryService.js";

const LotteryItem = ({lottery}) => {

    const navigate = useNavigate();
    const {tg, onToggleButton} = useTelegram();

    const onInvestHandler = () => {
        getInvoiceLink((link) => {
            tg.openInvoice(link);
        })
    }

    return (
        <div>
            <Card sx={{ minWidth: 350 }}>

                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        1.343.222 ⭐ <br/>
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">

                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
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