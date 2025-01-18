import React, {useState} from 'react';
import {Box, Card, CardActions, CardContent, Grid, LinearProgress, Modal, Typography} from "@mui/material";
import Button from "../../components/Button/Button.jsx";

import {useTelegram} from "../../hooks/useTelegram.js";
import {useNavigate} from "react-router-dom";
import {getBoostInvoiceLink, getInvoiceLink} from "../../service/LotteryService.js";
import CountdownTimer from "../../components/CountdownTimer.jsx";
import '../../App.css';
import InputSlider from "../../components/Slider/InputSlider.jsx";
import {Constants} from "../../service/Constants.js";

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

    const onBoostHandler = (type) => {

        if (Constants.BOOST_JUNIOR === type && !lottery?.juniorBoostAvailable) {
            return;
        }

        if (Constants.BOOST_MIDDLE === type && !lottery?.middleBoostAvailable) {
            return;
        }

        if (Constants.BOOST_SENIOR === type && !lottery?.seniorBoostAvailable) {
            return;
        }

        getBoostInvoiceLink(lottery.id, user?.id, type, (link) => {
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

                <CardContent sx={{p:1}}>
                    <Typography component="div" variant="h4" sx={{fontWeight: 'bold'}}>
                        {lottery.name}
                    </Typography>


                    <Grid container alignItems="center" justifyContent="space-between">

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="body2">Total invested:</Typography>
                                </Box>
                            </Grid>
                            <Typography>{lottery?.totalInvested || 0} ⭐</Typography>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="body2">You invested:</Typography>
                                </Box>
                            </Grid>
                            <Typography>{lottery?.myInvestment || 0} ⭐</Typography>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item display="flex" alignItems="center">
                                <Box>
                                    <Typography variant="body2">Limit of participants:</Typography>
                                </Box>
                            </Grid>
                            <Typography>{

                                lottery?.limitMaxInvestors === undefined ? 'ꝏ' : lottery?.totalInvestors + '/' + lottery?.limitMaxInvestors
                            } 👤</Typography>
                        </Grid>

                        <Grid container alignItems="center" justifyContent="space-between" mt={1}>
                            <Grid item display="flex" alignItems="center">

                                {
                                    lottery?.prizeDistributions.length === 1 ?
                                        <Typography variant="h4">🥇100%</Typography>
                                        :
                                        <Box>
                                            <Typography variant="h4">🥇50%</Typography>
                                            <Typography variant="h5">🥈25%</Typography>
                                            <Typography variant="h5">🥉25%</Typography>
                                        </Box>
                                }

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
                                "& .MuiLinearProgress-bar": {backgroundColor: "#F1A06A"},
                            }}
                        />

                        <CountdownTimer targetDate={endDate}/>
                    </Box>

                </CardContent>
                <CardActions disableSpacing sx={{
                    alignSelf: "stretch",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    // 👇 Edit padding to further adjust position
                }}>

                    <Box sx={{opacity: lottery?.myInvestment > 0 ? 1 : 0.5}} className="boost"
                         onClick={() => onBoostHandler(Constants.BOOST_JUNIOR)}>
                        <Box
                            className={lottery?.juniorBoostAvailable ? 'boost-not-activated' : 'boost-activated'}
                            component="img"
                            src='l1.png'
                            alt="boostLvl1"/>
                        {lottery?.juniorBoostAvailable ? <Typography variant="body2">50⭐</Typography> : null}
                    </Box>


                    <Box sx={{opacity: lottery?.myInvestment > 0 ? 1 : 0.5}} className="boost"
                         onClick={() => onBoostHandler(Constants.BOOST_MIDDLE)}>
                        <Box
                            className={lottery?.middleBoostAvailable ? 'boost-not-activated' : 'boost-activated'}
                            component="img"
                            src='l2.png'
                            alt="boostLvl2"/>
                        {lottery?.middleBoostAvailable ? <Typography variant="body2">200⭐</Typography> : null}
                    </Box>


                    <Box sx={{opacity: lottery?.myInvestment > 0 ? 1 : 0.5}} className="boost"
                         onClick={() => onBoostHandler(Constants.BOOST_SENIOR)}>
                        <Box className={lottery?.seniorBoostAvailable ? 'boost-not-activated' : 'boost-activated'}
                            component="img"
                            src='l3.png'
                            alt="boostLvl3" />
                        {lottery?.seniorBoostAvailable ? <Typography variant="body2">500⭐</Typography> : null}
                    </Box>


                    <Box>
                        <Button size='small' onClick={onChooseSizeHandler}>Invest ⭐</Button>
                    </Box>

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
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                <InputSlider callback={setAmount}/>
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