import React, {useState} from 'react';
import {Box, Card, CardActions, CardContent, Grid, LinearProgress, Modal, Typography} from "@mui/material";
import Button from "../../components/Button/Button.jsx";

import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getInvoiceLink} from "../../service/LotteryService.js";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import '../../App.css';
import InputSlider from "../../components/Slider/InputSlider.jsx";

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const LotteryItem = ({lottery}) => {

    const navigate = useNavigate();
    const {tg, user} = useTelegram();

    const [amount, setAmount] = useState(0);

    const onInvestHandler = () => {
        getInvoiceLink(lottery.id, user?.id, amount, (link) => {
            tg.openInvoice(link);
        });
    }
    const onChooseSizeHandler = () => {
        handleOpen();
    }

    let endDate = lottery.endDate;
    let progress = calculateProgress(lottery.startDate, lottery.endDate);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                height: "15px",
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
                    <Button size='large' onClick={onChooseSizeHandler}>Invest ⭐</Button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                How much you want to invest?
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <InputSlider callback={setAmount} />
                            </Typography>
                            <Button size='large' onClick={onInvestHandler}>Ok</Button>

                        </Box>

                    </Modal>
                </CardActions>
            </Card>
        </div>
    );
};

export default LotteryItem;