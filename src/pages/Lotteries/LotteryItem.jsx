import React from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    LinearProgress,
    Typography
} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getInvoiceLink} from "../../service/LotteryService.js";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import '../../App.css';

function calculateProgress(startDate, endDate) {
    const now = new Date(); // текущая дата
    const start = new Date(startDate); // начало лотереи
    const end = new Date(endDate); // окончание лотереи

    if (now < start) {
        return 0; // лотерея еще не началась
    }
    if (now > end) {
        return 100; // лотерея уже закончилась
    }

    const elapsedTime = now - start; // прошедшее время в миллисекундах
    const totalTime = end - start; // общая продолжительность в миллисекундах

    const progress = (elapsedTime / totalTime) * 100; // процент пройденного времени
    return progress.toFixed(2); // округляем до двух знаков после запятой
}
const LotteryItem = ({lottery}) => {

    const navigate = useNavigate();
    const {tg, user} = useTelegram();


    const onInvestHandler = () => {
        getInvoiceLink(lottery.id, user?.id, 1, (link) => {
            tg.openInvoice(link);
        })
    }

    let endDate = lottery.endDate;
    let progress = calculateProgress(lottery.startDate, lottery.endDate);

    return (
        <div>
            <Card>

                <CardContent>
                    <Typography gutterBottom component="div" variant="h5">
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

                    {/*<Box display="flex" alignItems="center">*/}
                    {/*    <CountdownTimer targetDate={endDate} />*/}
                    {/*</Box>*/}
                    <Box display="flex" alignItems="center">
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                width: "100%",
                                height: "10px",
                                backgroundColor: "#333",
                                "& .MuiLinearProgress-bar": { backgroundColor: "#F1A06A" },
                            }}
                        />

                        <CountdownTimer targetDate={endDate} />
                    </Box>

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

                </CardActions>

            </Card>
        </div>
    );
};

export default LotteryItem;