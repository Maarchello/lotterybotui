import DateTimeDisplay from "./DateTimeDisplay.jsx";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <div className="countdown-link">
                <DateTimeDisplay value={days} type={'D'} isDanger={days <= 3} />
                <p>:</p>
                <DateTimeDisplay value={hours} type={'H'} isDanger={hours <= 6} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type={'M'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'S'} isDanger={false} />
            </div>
        </div>
    );
};

export default ShowCounter;