import styled from 'styled-components/native';

const Wrapper = styled.Pressable`
    border-radius: 30px;
    background: #000;
    overflow: hidden;
    margin: 20px;
    flex: 1;
    justify-content: space-between;
`;

const BackgroundThumbnail = styled.ImageBackground`
    height: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.Text`
    font-weight: bold;
    font-size: 20px;
    margin: 20px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    textAlign: center;
    border-radius: 15px;
    padding: 5px 10px;
`;

const Time = styled.Text`
    font-weight: bold;
    font-size: 20px;
    margin: 20px;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
    textAlign: center;
    border-radius: 15px;
    padding: 5px 10px;
`;

const LaunchPreview = ({ data, onPress }) => {
    return (
        <Wrapper onPress={onPress}>
            <BackgroundThumbnail source={{ uri: data.image || data.rocket.configuration.image_url }} imageStyle={{ opacity: 0.9 }}>
                <Title>{ data.name }</Title>
                <Time>{ new Date(data.net).toLocaleString() }</Time>
            </BackgroundThumbnail>
        </Wrapper>
    )
}

export default LaunchPreview;