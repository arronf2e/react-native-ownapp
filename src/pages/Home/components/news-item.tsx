import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  View,
  Image
} from "react-native";

import { format } from "timeago.js";

const styles = StyleSheet.create({
  itemWrap: {
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    paddingBottom: 10,
    paddingTop: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
		flexDirection: 'row'
	},
	content: {
		flex: 1,
		paddingRight: 5,
		justifyContent: 'space-between'
	},
  title: {
    fontSize: 13
  },
  info: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10
  },
  src: {
    fontSize: 11,
    color: "#333"
  },
  time: {
    fontSize: 10,
		color: "#333",
		paddingLeft: 10,
  }
});

// 函数式组件，接收props，返回组件
const NewsItem = ({ news }) => {
  console.log(news.pic);
  return (
    <TouchableOpacity>
      <View style={styles.itemWrap}>
        <View style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.title}>{news.title}</Text>
            <View style={styles.info}>
              <Text style={styles.src}>{news.src}</Text>
              <Text style={styles.time}>{format(news.time, "zh_CN")}</Text>
            </View>
          </View>
          <Image style={{ width: 80, height: 60 }} source={{ uri: news.pic }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItem;
