
'use strict';

import React, { Component, PropTypes } from 'react'
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Images from '../pliers/images'
import px2dp from '../pliers/screenPx'

let { width, height } = Dimensions.get('window')

export default class Rank extends Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    name: PropTypes.string.isRequired, // 商品名
    logo: PropTypes.number.isRequired, // 商品logo
    scores: PropTypes.number, //热度
    sale: PropTypes.number, //竞猜量
    bao: PropTypes.bool, // 保计划
    piao: PropTypes.bool, // 票
    onPress: PropTypes.func
  }

  render() {
    const { name, logo, scores, sale, bao, piao, onPress } = this.props
    
    return (
      <Button style={{ flex: 1 }} onPress={onPress}>
        <View style={styles.bzWrap}>
          <Image source={logo} style={styles.bzLogo} />
          <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
            <Text style={{ marginTop: 10 }}>Apple iMac 21.5英寸一体机（双核 Core i5 处理器/8GB内存/1TB存储 MK142CH/A）</Text>
            <Text style={{ color: '#ff5f3e', fontWeight: 'bold', fontSize: px2dp(13) }}>市场价￥7088.00</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#f3f3f3', width: 120, borderRadius: 5, height: 10 }}>
                <View style={{ flex: 1, width: 70, backgroundColor: '#FFBC46', borderRadius: 5 }}>
                </View>
              </View>
              <Text style={{ color: 'blue', marginLeft: 5, fontSize: px2dp(11) }}>
                89%
                <Text style={{color:'#aaa'}}>  已参团</Text>
              </Text>
            </View>
            <Text style={{ fontSize: px2dp(11), color: 'black' }}>幸运币可用</Text>
          </View>
        </View>
      </Button>
    )
  }
}

class Button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return Platform.OS === 'ios' ? (
      <TouchableWithoutFeedback {...this.props}>{this.props.children}</TouchableWithoutFeedback>
    ) : (
        <View {...this.props}><TouchableNativeFeedback onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback></View>
      )
  }
}

const styles = StyleSheet.create({
  bzWrap: {
    backgroundColor: "#fff",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    flexDirection: 'row'
  },
  border: {
    flexDirection: "row",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5"
  },
  bzLogo: {
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#f9f9f9",
    width: px2dp(130),
    height: px2dp(130),
  },
})
