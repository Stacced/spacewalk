import { Text } from 'react-native';
import styled from 'styled-components/native';
import { MONTHS } from '../constants';

const Wrapper = styled.View`
    padding: 30px 20px;
    background: #fff;
    border-top-width: 1px;
    border-color: #e6e6e6;
`;

const DateWrapper = styled.View`
    border-radius: 5px;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background: blue;
`;

const Day = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: white;
`;

const TextWrapper = styled.View`
    margin-left: 20px;
    width: 75%;
`;

const Row = styled.View`
    flex-direction: row;
`;

const Description = styled.Text`
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    font-size: 15px;
`;


const CalendarCard = props => {
    const launchTime = new Date(props.data.net);

    return (
        <Wrapper>
            <Row>
                <DateWrapper>
                    {launchTime.getDate() / 1000 === 0 ? (
                        <Day>TBD</Day>
                    ) : (
                        <>
                            <Day>{launchTime.getDate()}</Day>
                            <Day>{MONTHS[launchTime.getMonth()]}</Day>
                        </>
                    )}
                </DateWrapper>
                <TextWrapper>
                    <Description bold>{props.data.name}</Description>
                    <Description numberOfLines={1}>{props.data.pad.name}</Description>
                    <Text numberOfLines={2}>
                        {
                            props.data.launch_service_provider.name.length < 50
                            ? props.data.launch_service_provider.name
                            : props.data.launch_service_provider.abbrev
                        }
                    </Text>
                </TextWrapper>
            </Row>
        </Wrapper>
    )
}

export default CalendarCard;