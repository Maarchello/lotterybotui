import React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css'
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../Button/Button.jsx";

const Header = () => {

    const {onClose} = useTelegram();
    const location = useLocation();
    const navigate = useNavigate();
    const onBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/', {replace: true})
        }
    }

    let isMainLocation = location.pathname === `/`;

    return (
        <div className={'header'}>
            <Button onClick={isMainLocation ? onClose : onBack}>{isMainLocation ? 'Close' : 'Back'}</Button>
        </div>
    );
};

export default Header;