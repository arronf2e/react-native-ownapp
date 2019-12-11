import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";
import { NavigationProps } from "~/interfaces";

interface HomeDetailProps extends NavigationProps {
  [key: string]: any;
}

interface HomeDetailState {
  [key: string]: any;
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 150,
  },
  header: {
    padding: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    
  },
  src: {
    fontSize: 11,
  },
  pdate: {
    fontSize: 11,
  },
  content: {
    padding: 10,
    fontSize: 12
  }
});

class SearchResult extends Component<HomeDetailProps, HomeDetailState> {
  // 配置导航栏信息
  static navigationOptions = ({ navigation }) => {
    return {
      // 通过navigation.getParam('name')或navigation.state.params
      title: navigation.state.params.news.title || '详情'
    };
  };

  render() {
    const { news } = this.props.navigation.state.params;
    console.log(news, "1");
    return (
      <SafeAreaView>
        <StatusBar translucent={false} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{news.full_title}</Text>
            <View styles={styles.info}>
              <Text style={styles.src}>{news.src}  {news.pdate}</Text>
              {/* <Text style={styles.pdate}></Text> */}
            </View>
          </View>
          <HTMLView style={styles.content} value={news.content} />
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchResult;
