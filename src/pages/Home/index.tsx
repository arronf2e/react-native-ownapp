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

import { JISUKEY } from "~/config";

// props 接口，描述该组件的props数据结构
interface HomeProps extends NavigationProps {
  [key: string]: any;
}

// state 接口，描述该组件的state数据结构
interface HomeState {
  [key: string]: any;
}

const styles = StyleSheet.create({
  tabContainer: {
    width: "120%",
    // flex: 1,
    height: 30,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  tabItem: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    color: "#333"
  },
  activeTab: {
    color: "red",
    borderBottomWidth: 1,
    borderBottomColor: "#00FF00"
  },
  newsList: {
    paddingBottom: 200
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
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
      start: 20,
      loading: true
    };
  }

  componentDidMount() {
    fetch(`https://api.jisuapi.com/news/channel?appkey=${JISUKEY}`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res, 'typelist')
        this.setState({
          tabs: res.result || [],
          selectedTab: res.result[0]
        }, () => {
          this.getNewsListByType();
        });
      });
  }

  getNewsListByType = () => {
    const { start, selectedTab, newsList } = this.state;
    console.log(start, selectedTab, '1')
    fetch(
      `https://api.jisuapi.com/news/get?channel=${selectedTab}&start=${start}&num=20&appkey=${JISUKEY}`
    )
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.setState({
          loading: false
        })
        const list =  newsList.concat(res.result.list)
        this.setState({
          newsList: list
        });
      });
  };

  private changeName = (name, text) => {
    if (name === this.state.name) {
      // 调用setState时，无论数据有没有发生改变，都会调用render，这里需要加下判断
      return;
    }
    this.props.home.changeText(text);
    // setState 改变state数据
    this.setState({ name }, () => {
      // 这里是回调，在这里想干啥干啥
    });
  };

  private toDetail = () => {
    // 路由跳转
    this.props.navigation.navigate("HomeDetail", { name: this.state.name });
  };

  _chooseTab = tab => {
    this.setState({
      selectedTab: tab,
      start: 20,
    }, () => {
      // this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    });
    this.getNewsListByType();
  }

  _onEndReached = () => {
    console.log('end')
    const {start} = this.state
    this.setState({
      start: start + 1
    }, () => {
      this.getNewsListByType();
    })
  }

  render() {
    const { selectedTab, tabs, newsList, loading } = this.state;
    console.log(newsList, "11");
    return (
      <SafeAreaView>
        <StatusBar translucent={false} />
        <ScrollView
          style={styles.tabContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map(item => (
            <TouchableOpacity number={0} onPress={() => this._chooseTab(item)}>
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
        </ScrollView>
        {/* <ActivityIndicator animating={true} color="red" size="large" /> */}
        
        {
          loading ?<View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>: null
        }
        <FlatList
          style={styles.newsList}
          data={newsList}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={11}
          renderItem={({ item }) => <NewsItem key={item} news={item} />}
        />
      </SafeAreaView>
    );
  }
}

export default Home;
