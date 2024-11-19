import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse, Grid, IconButton,
    LinearProgress, styled,
    Typography
} from "@mui/material";

import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getInvoiceLink} from "../../service/LotteryService.js";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import '../../App.css';
import {ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// const ExpandMoreAdapter = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));
//
// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

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

    const [expanded, setExpanded] = useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                    <Typography gutterBottom component="div" variant="h4" sx={{fontWeight: 'bold'}}>
                        {lottery.name}
                    </Typography>


                    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h5">Total invested:</Typography>
                            </Box>
                        </Grid>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h5">{lottery?.totalInvested || 0} ⭐</Typography>
                            </Box>
                        </Grid>

                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h6">You invested:</Typography>
                            </Box>
                        </Grid>
                        <Grid item display="flex" alignItems="center">
                            <Box>
                                <Typography variant="h6">{lottery?.myInvestment || 0} ⭐</Typography>
                            </Box>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="space-between" mt={2}>
                            <Grid item display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="h4">🥇 50%</Typography>
                                    <Typography variant="h5">🥈 25%</Typography>
                                    <Typography variant="h5">🥉 25%</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

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
                    p: 2,
                }}>
                    <Button size='large' onClick={onInvestHandler}>Invest</Button>

                </CardActions>
            </Card>
        </div>
    );
};

export default LotteryItem;