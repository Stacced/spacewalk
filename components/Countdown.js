import { useEffect } from 'react';
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

let timer;
const Countdown = ({ launchTime, status }) => {
    const [timeLeft, setTimeLeft] = React.useState(0);
    const launchTimestamp = new Date(launchTime).getTime() / 1000;
    
    useEffect(() => {
        updateTimeLeft();
        timer = setInterval(() => {
            updateTimeLeft();
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    });

    const updateTimeLeft = () => {
        const now = new Date();
        const timeLeft = launchTimestamp * 1000 - now.getTime();
        setTimeLeft(timeLeft);
    }

    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return (
        <Wrapper>
            <>
            <UnitBlockWrapper>
                <Number>{ days }</Number>
                <Unit>{`day${days !== 1 ? 's' : ''}`}</Unit>
            </UnitBlockWrapper>
            <UnitBlockWrapper>
                <Number>{ hours }</Number>
                <Unit>{`hour${hours !== 1 ? 's' : ''}`}</Unit>
            </UnitBlockWrapper>
            <UnitBlockWrapper>
                <Number>{ minutes }</Number>
                <Unit>{`minute${minutes !== 1 ? 's' : ''}`}</Unit>
            </UnitBlockWrapper>
            <UnitBlockWrapper>
                <Number>{ seconds }</Number>
                <Unit>{`second${seconds !== 1 ? 's' : ''}`}</Unit>
            </UnitBlockWrapper>
            </>
        </Wrapper>
    )
}

export default Countdown;