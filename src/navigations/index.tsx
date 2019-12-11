/*
  路由管理 https://reactnavigation.org/en/
*/

import React from 'react';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Icon.loadFont();

// tab页面
import HomeIndex from "~/pages/Home";
import NewsIndex from "~/pages/News";

// 子页面
import HomeScreens from "./home";
import NewsScreens from "./news";

export const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeIndex,
      navigationOptions: {
        tabBarLabel: "技术推荐",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='search' color={tintColor} size={24} />
        ),
      }
    },
    News: {
      screen: NewsIndex,
      navigationOptions: {
        tabBarLabel: "每日新闻",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='heart' color={tintColor} size={24} />
        ),
      }
    },
    Mine1: {
      screen: NewsIndex,
      navigationOptions: {
        tabBarLabel: "今日天气",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='rocket' color={tintColor} size={24} />
        ),
      }
    },
    Mine2: {
      screen: NewsIndex,
      navigationOptions: {
        tabBarLabel: "关于",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='rocket' color={tintColor} size={24} />
        ),
      }
    }
  },
  {
    initialRouteName: "News",
    tabBarOptions: {
      style: {
        height: 55,
        borderTopColor: '#F0F0F0'
      }
    }
  }
);

TabNavigator.navigationOptions = {
  header: null
};

const AppNavigator = createStackNavigator(
  {
    TabScreen: TabNavigator,
    ...HomeScreens,
    ...NewsScreens
  },
  {
    headerBackTitleVisible: false
  }
);

export default createAppContainer(AppNavigator);
