import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { NavigationProps } from "~/interfaces"

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

class SearchResult extends Component<HomeDetailProps, HomeDetailState> {
  // 配置导航栏信息
  static navigationOptions = ({ navigation }) => {
    return {
      // 通过navigation.getParam('name')或navigation.state.params
      title: '搜索结果',
    };
  };

  render() {
    const { keyword } = this.props.navigation.state.params
    console.log(keyword, '1')
    return (
      <SafeAreaView>
        <StatusBar translucent={false}/>
        <View style={styles.container}>
          <Text>111</Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default SearchResult;
