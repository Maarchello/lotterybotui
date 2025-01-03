import React, {useEffect, useState} from 'react';
import {getLotteries} from "../../service/LotteryService.js";
import LotteryItem from "./LotteryItem.jsx";

const LotteriesPage = () => {

    const [lotteries, setLotteries] = useState([]);

    useEffect(() => {
        getLotteries((data) => {
            setLotteries(data.content);
        })
    }, []);

    return (
        <div className="container" style={{marginBottom:"40px"}}>
            {lotteries

                .map(item => {
                    return <div style={{marginBottom: "20px"}}><LotteryItem lottery={item} /></div>
                })
            }
        </div>
    );
}

export default LotteriesPage;