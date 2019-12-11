import React, { Component } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from "react-native";
import { NavigationProps } from "~/interfaces";

import NewsItem from "../components/news-item";

interface HomeDetailProps extends NavigationProps {
  [key: string]: any;
}

interface HomeDetailState {
  [key: string]: any;
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 150,
  }
});

class SearchResult extends Component<HomeDetailProps, HomeDetailState> {
  // 配置导航栏信息
  static navigationOptions = ({ navigation }) => {
    return {
      // 通过navigation.getParam('name')或navigation.state.params
      title: "搜索结果"
    };
  };

  state = {
    newsList: []
  };

  componentDidMount() {
    const { keyword } = this.props.navigation.state.params;
    this._getNewsList(keyword);
  }

  _getNewsList = keyword => {
    fetch(
      `http://api.avatardata.cn/ActNews/Query?key=102fe42ecdd24e86917544ef4630573a&keyword=${keyword}`
    )
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res, "1");
        this.setState({
          newsList: res.result || []
        });
      });
  };

  render() {
    const { newsList } = this.state;
    return (
      <SafeAreaView>
        <StatusBar translucent={false} />
        <View style={styles.container}>
          {newsList.length ? newsList.map(news => (
            <NewsItem news={news} />
          )): <Text>查不到相关新闻</Text>}
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchResult;
