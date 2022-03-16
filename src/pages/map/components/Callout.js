import React from 'react';
import {NodePlayerView} from 'react-native-nodemediaclient';
// import {WebView} from 'react-native-webview';
import {StyleSheet, View, Text, Platform, Image, Button} from 'react-native';

export default class CustomCalloutView extends React.Component {
  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
  }
  componentWillUnmount() {
    this.playerRef.stop();
  }
  render() {
    const {message, onClose} = this.props;
    return (
      <View style={styles.calloutContainerStyle}>
        <View style={styles.header}>
          <Text style={styles.customCalloutText}>{message}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
        {/* <Image source={pin} /> */}
        {/* <WebView
        javaScriptEnabled={true}
        style={{
          flex: 1,
          borderColor: 'red',
          borderWidth: 1,
          height: 400,
          width: 400,
        }}
        source={{
          uri: 'https://www.youtube.com/embed/RJa4kG1N3d0',
        }}
      /> */}
        <NodePlayerView
          ref={vp => {
            this.playerRef = vp;
          }}
          style={{height: 200}}
          inputUrl={'rtmp://192.168.1.5/live/SkXWBvyG9'}
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customCalloutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutContainerStyle: {
    backgroundColor: 'white',
    width: 350,
    height: 250,
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
