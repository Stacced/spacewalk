import { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    margin: 0 20px;
    border-radius: 10px;
    align-items: center;
    padding: 20px;
    flex-direction: row;
    justify-content: space-around;
`;

const UnitBlockWrapper = styled.View`
    align-items: center;
    justify-content: center;
`;

const Number = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const Unit = styled.Text`
    font-size: 10px;
    font-weight: bold;
`;

const StatusText = styled.Text`
    font-size: 20px;
`;

let timer;
const Countdown = ({ launchTime, status }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const launchTimestamp = new Date(launchTime).getTime() / 1000;
    
    useEffect(() => {
        updateTimeLeft();
        if (timeLeft > 0) {
            timer = setInterval(() => {
                updateTimeLeft();
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        }
    }, []);

    const updateTimeLeft = () => {
        const now = new Date();
        const timeLeft = launchTimestamp * 1000 - now.getTime();
        setTimeLeft(timeLeft);
    }

    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const noTimeData = timeLeft <= 0;

    return (
        <Wrapper>
            {
                noTimeData ? <StatusText>{ status.description }</StatusText> :
                <>
                <UnitBlockWrapper>
                    <Number>{ noTimeData ? '-' : days }</Number>
                    <Unit>{`day${days !== 1 ? 's' : ''}`}</Unit>
                </UnitBlockWrapper>
                <UnitBlockWrapper>
                    <Number>{ noTimeData ? '-' : hours % 24 }</Number>
                    <Unit>{`hour${hours !== 1 ? 's' : ''}`}</Unit>
                </UnitBlockWrapper>
                <UnitBlockWrapper>
                    <Number>{ noTimeData ? '-' : minutes % 60 }</Number>
                    <Unit>{`minute${minutes !== 1 ? 's' : ''}`}</Unit>
                </UnitBlockWrapper>
                <UnitBlockWrapper>
                    <Number>{ noTimeData ? '-' : seconds % 60 }</Number>
                    <Unit>{`second${seconds !== 1 ? 's' : ''}`}</Unit>
                </UnitBlockWrapper>
                </>
            }
        </Wrapper>
    )
}

export default Countdown;