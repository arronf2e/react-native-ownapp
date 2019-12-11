import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  View
} from "react-native";
import { observer, inject } from "mobx-react";

import { NavigationProps } from "~/interfaces";
import NewsItem from "./components/news-item";

// props 接口，描述该组件的props数据结构
interface HomeProps extends NavigationProps {
  [key: string]: any;
}

// state 接口，描述该组件的state数据结构
interface HomeState {
  [key: string]: any;
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row"
  },
  tabContainer: {
    flex: 1,
    // height: 30,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  activeTab: {
    color: "red",
    backgroundColor: '#F0F0F0'
    // borderBottomWidth: 1,
    // borderBottomColor: "#00FF00"
  },
  newsList: {
    width: 220
  },
  // loading: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   alignItems: "center",
  //   justifyContent: "center"
  // }
});

// 类组件，需要继承React的Component或PureComponent
@inject("home")
@observer
class Home extends Component<HomeProps, HomeState> {
  // 构造函数，可以不写
  constructor(props) {
    // super 指代父类(这里是Component)的构造函数, 在调用 super() 之前，无法在构造函数中使用 this
    // 必须在constructor()调用super()方法，否则新建实例时会报错，因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工，如果不调用super方法；子类就得不到this对象。
    super(props);
    // 初始化state
    this.state = {
      tabs: [],
      selectedTab: "",
      newsList: [],
      results: {},
      loading: false
    };
    this.flatListRef = React.createRef();
  }

  componentDidMount() {
    fetch(`http://gank.io/api/today`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          tabs: res.category || [],
          selectedTab: res.category[0],
          results: res.results,
          newsList: res.results[res.category[0]]
        });
        this.setState({
          loading: false
        });
      });
  }

  _toDetail = news => {
    // 路由跳转
    console.log(news, "news");
    this.props.navigation.navigate("HomeDetail", {
      url: news.url,
      title: news.desc
    });
  };

  _chooseTab = tab => {
    this.setState(
      {
        selectedTab: tab,
        newsList: this.state.results[tab]
      },
      () => {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
      }
    );
  };

  _onEndReached = () => {
    console.log("end");
    const { start } = this.state;
    this.setState({
      start: start + 1
    });
  };

  render() {
    const { selectedTab, tabs, newsList, loading } = this.state;
    console.log(newsList, "newslist");
    return (
      <SafeAreaView>
        <StatusBar translucent={false} backgroundColor={'#FFF'} color={'#000'}/>
        <View style={styles.wrap}>
          <View
            style={styles.tabContainer}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {tabs.map(item => (
              <TouchableOpacity
                number={0}
                onPress={() => this._chooseTab(item)}
              >
                <Text
                  style={[
                    styles.tabItem,
                    selectedTab === item ? styles.activeTab : null
                  ]}
                  key={item}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* <ActivityIndicator animating={true} color="red" size="large" /> */}

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            style={styles.newsList}
            data={newsList}
            renderItem={({ item }) => (
              <NewsItem
                viewDetail={e => this._toDetail(item, e)}
                key={item._id}
                news={item}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
