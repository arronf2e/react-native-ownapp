import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import { BaseStatusBar } from "~/components";
import SafeAreaView from "react-native-safe-area-view";
import Icon from "react-native-vector-icons/dist/FontAwesome";

import { width, height } from "~/config";

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center"
  },
  inputWrap: {
    width: 300,
    height: 50,
    borderStyle: "solid",
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 30
    // paddingLeft: 20
  },
  input: {
    color: "#000",
    paddingLeft: 40,
    paddingRight: 20
  },
  keyList: {
    width: 300,
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  key: {
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  }
});

class News extends Component {
  state = {
    keyword: "",
    keyList: []
  };

  componentDidMount() {
    this.getKeyList();
  }

  private toMyList = () => {
    console.log("我的家电");
  };

  private toSearchList = () => {
    console.log("搜索");
  };

  _setKeyword = key => {
    this.setState({
      keyword: key
    }, () => {
      this._search()
    });
  };

  _search = () => {
    console.log('yes', this.state.keyword)
    this.props.navigation.navigate("SearchResult", {
      keyword: this.state.keyword,
    });
  };

  getKeyList = () => {
    fetch(
      "http://api.avatardata.cn/ActNews/LookUp?key=102fe42ecdd24e86917544ef4630573a"
    )
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res, "1");
        this.setState({
          keyList: res.result
        });
      });
  };

  render() {
    const { keyList } = this.state;
    return (
      <SafeAreaView>
        <BaseStatusBar backgroundColor="#000" />
        <StatusBar translucent={false} />
        <View style={styles.container}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="你想看什么新闻呢"
              onChangeText={text => this.setState({ keyword: text })}
              value={this.state.keyword}
            />
            <TouchableOpacity onPress={this._search}>
              <Icon name="search" color={"#999"} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.keyList}>
            {keyList.slice(0, 15).map(key => (
              <TouchableOpacity onPress={e => this._setKeyword(key, e)}>
                <Text style={styles.key}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default News;
