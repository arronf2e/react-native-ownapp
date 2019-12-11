import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationProps } from "~/interfaces"
import { width ,height} from '~/config'

interface HomeDetailProps extends NavigationProps {
  [key: string]: any
}

interface HomeDetailState {
  [key: string]: any
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 150,
  }
})

class HomeDetail extends Component<HomeDetailProps, HomeDetailState> {
  // 配置导航栏信息
  static navigationOptions = ({ navigation }) => {
    return {
      // 通过navigation.getParam('name')或navigation.state.params
      title: navigation.getParam('title'),
    };
  };

  render() {
    const { url } = this.props.navigation.state.params
    console.log(url, '1')
    return (
      // <SafeAreaView>
      //   <StatusBar translucent={false}/>
      //   <View style={styles.container}>
          
      //   </View>
      // </SafeAreaView>
      <WebView
        source={{uri: url}}
        style={{width, height}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    );
  }
};

export default HomeDetail;
