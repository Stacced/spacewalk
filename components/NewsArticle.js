import WebView from "react-native-webview";

const NewsArticle = ({ route }) => {
    const data = route.params.item;

    return (
        <WebView source={{ uri: data.url }} style={{ margin: 20 }} />
    )
}

export default NewsArticle;