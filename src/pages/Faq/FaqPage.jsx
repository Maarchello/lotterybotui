import React, {useState} from 'react';
import {Box, Button, Collapse, IconButton, Typography} from "@mui/material";
import {useTelegram} from "../../hooks/useTelegram.js";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqPage = () => {

    const {tg, user} = useTelegram();
    const [faq, setFaq] = useState([
        {
            "q": "Why might it be beneficial for me to participate in the lottery and what do the developers gain from it?",
            "a": "This is a PvP lottery 🎲, meaning you compete against other players 🏆, not the developers. The fewer participants 👥 and the more you invest 💰, the better your chances! Developers take a commission 💼 from each lottery to support and develop the project 🔧 and are directly invested in your winnings 🏅."
        },
        {
            "q": "I invested 100 stars, how much can I win?",
            "a": "With any amount of invested stars ⭐️, you can secure one of the winning positions 🏅 listed in the lottery tab. However, your probability of winning depends on the number of stars you invest 💸. For example, if all other participants have invested 50 stars ⭐️ and you invest 100, you will secure 1st place 🥇 with a probability of 100 / (50 + 100) ≈ 67%. To increase your chances of winning, it is advantageous to invest more stars 💰 or have fewer competitors 😎."
        },
        {
            "q": "How is the winner determined?",
            "a": "The more stars ⭐️ you invest, the higher your chance of winning 📈. The winner is chosen randomly 🎲 based on the number of invested stars and any additional enhancements, such as boosts 🚀 or subscriptions 📅."
        },
        {
            "q": "How and when are winnings paid?",
            "a": "Winnings are paid in stars ⭐️ and will be credited within 21 days ⏳, according to Telegram's policy 📜. (https://telegram.org/tos/content-creator-rewards#4-1-balance)"
        },
        {
            "q": "How are rewards distributed?",
            "a": "There are several reward tiers 🏆, each receiving a specified percentage 📊 of the total invested stars ⭐️."
        },
        {
            "q": "How does the referral program work?",
            "a": "Refer a friend using your link 🤝. When they participate in the lottery 🎟, you receive a Timecoin 💰 and a free ticket 🎫 to a private lottery exclusive to those who refer friends 🔒."
        },
        {
            "q": "How do boosts work?",
            "a": "Boosts increase your invested funds by a certain percentage 📈, meaning the more you invest 💰, the stronger the boosts work! 🚀 Be boosted! 😎"
        },
        {
            "q": "How do different subscriptions work?",
            "a": "Subscriptions come with numerous bonuses and perks 🎁. You can view their descriptions on the subscriptions page 📄. \n" +
                "We recommend subscribing 😎 — the longer your subscription lasts, the more Timecoins 💰 and various bonuses you will receive!"
        },
        {
            "q": "How does Timecoin work?",
            "a": "Timecoin is a cross-game currency 🌐 and token 💎 that you can earn by participating in lotteries 🎟 and various games 🎮 (coming soon). With each lottery, you'll receive some Timecoin 💰—don't lose it! 🛡 It'll be very valuable in the future 🚀"
        }
    ]);

    const [expandedAnswer, setExpandedAnswer] = useState(null);

    const handleToggle = (id) => {
        setExpandedAnswer(expandedAnswer === id ? null : id);
    };


    return (
        <div>
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

                    overflow: "auto"
                }}>

                {faq.map(item => {
                    return <Box sx={{marginBottom: "10px"}}>
                        <Button sx={{
                            borderRadius: 0,
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#3a3939"
                        }}>
                            <Typography sx={{textAlign: "left"}}>{item.q}</Typography>
                            <IconButton onClick={() => handleToggle(item.q)}>
                                {expandedAnswer === item.q ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Button>

                        <Collapse sx={{marginBottom: "10px", backgroundColor: "#3a3939"}} in={expandedAnswer === item.q} timeout="auto" unmountOnExit>
                            <Box sx={{padding:"10px"}}>
                                <Typography sx={{textAlign: "left"}} variant="body1">{item.a}</Typography>
                            </Box>
                        </Collapse>
                    </Box>
                })};

            </Box>
        </div>


    );
};

export default FaqPage;