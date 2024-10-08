import React, {useEffect, useState} from 'react';
import {getLotteries} from "../../service/LotteryService.js";
import LotteryItem from "./LotteryItem.jsx";

const LotteriesPage = () => {

    const [lotteries, setLotteries] = useState([]);

    useEffect(() => {
        getLotteries((data) => {
            setLotteries(data);
        })
    }, []);

    return (
        <div className="container">
            {lotteries

                .map(item => {
                    return <LotteryItem lottery={item} />
                })
            }
        </div>
    );
}

export default LotteriesPage;