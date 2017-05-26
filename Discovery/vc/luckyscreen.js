"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Platform,
    Button,
    ScrollView,
    RefreshControl,
    Animated,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";

import px2dp from '../screenPx'
import Icon from 'react-native-vector-icons/Ionicons'
import Images from '../images'
import Swiper from 'react-native-swiper'

const isIOS = Platform.OS == "ios"
const headH = px2dp(isIOS ? 140 : 120)
const inputHeight = px2dp(28)
const { width, height } = Dimensions.get('window')

export default class Lucky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Lucky",
            isRefreshing: false
        }
    }

    _onRefresh() {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000)
    }

    _renderHeader() { //头部
        return (
            <View style={styles.header}>
                <Animated.View style={[styles.lbsWeather]}>
                    <View style={styles.lbs}>
                        <Icon name='ios-pin' size={px2dp(18)} color='#fff' />
                        <Text style={{ fontSize: px2dp(18), fontWeight: 'bold', color: '#fff', paddingHorizontal: 5 }}>{'中环时代广场'}</Text>
                        <Icon name='md-arrow-dropdown' size={px2dp(16)} color='#fff' />
                    </View>
                    <View style={styles.weather}>
                        <View style={{ marginRight: 5 }}>
                            <Text style={{ color: '#fff', fontSize: px2dp(11), textAlign: 'center' }}>{'23°'}</Text>
                            <Text style={{ color: '#fff', fontSize: px2dp(11) }}>{'阵雨'}</Text>
                        </View>
                        <Icon name='ios-flash-outline' size={px2dp(25)} color='#fff' />
                    </View>
                </Animated.View>
                <Animated.View
                    style={{ marginTop: px2dp(15) }}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={[styles.searchBtn, { backgroundColor: '#fff' }]}>
                            <Icon name='ios-search-outline' size={20} color='#666' />
                            <Text style={{ fontSize: 13, color: '#666', marginLeft: 5 }}>{'输入宝贝，宝贝名称'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View style={{ flexDirection: 'row', marginTop: 15 }}>
                    {
                        ['MacBook', '空气净化器', '酸奶', '话费充值卡', 'iPhone', '奔驰'].map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index}>
                                    <View style={{ marginRight: 15 }}>
                                        <Text style={{ fontSize: px2dp(12), color: '#fff' }}>{item}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </Animated.View>
            </View>
        )
    }

    _renderTypes() {
        const w = width / 4, h = w * .6 + 20
        let renderSwipeView = (types, n) => {
            return (
                <View style={styles.collectionView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{ width: w, height: h }, styles.collectionViewCell]}>
                                    <Image source={Images['h' + (i + n)]} style={{ width: w * .5, height: w * .5 }} />
                                    <Text style={{ fontSize: px2dp(12), color: "#666" }}>{item}</Text>
                                </View>
                            )
                            return (
                                isIOS ? (
                                    <TouchableHighlight style={{ width: w, height: h }} key={i} onPress={() => { }}>{render}</TouchableHighlight>
                                ) : (
                                        <TouchableNativeFeedback style={{ width: w, height: h }} key={i} onPress={() => { }}>{render}</TouchableNativeFeedback>
                                    )
                            )
                        })
                    }
                </View>
            )
        }
        return (
            <Swiper
                height={h * 2.4}
                paginationStyle={{ bottom: 10 }}
                dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6 }}>
                {renderSwipeView(['美食', '甜品饮品', '商店超市', '预定早餐', '果蔬生鲜', '新店特惠', '准时达', '高铁订餐'], 0)}
                {renderSwipeView(['土豪推荐', '鲜花蛋糕', '汉堡炸鸡', '日韩料理', '麻辣烫', '披萨意面', '川湘菜', '包子粥店'], 8)}
            </Swiper>
        )
    }

    render() {
        const { text } = this.state;
        return (
            <View style={styles.contain}>
                <ScrollView
                    styles={styles.scrollView}
                    scrollEventThrottle={16}//每秒触发ScrollView的事件16次
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            colors={['#ddd', '#0398ff']}//a
                            onRefresh={this._onRefresh.bind(this)}
                            progressBackgroundColor='black'//a
                        />
                    }
                >
                    {this._renderHeader()}
                    <View style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
                        {this._renderTypes()}
                        <TouchableOpacity>
                            <View style={{ height: px2dp(90), paddingHorizontal: 10 }}>
                                <Image source={Images.ad1} style={{ height: px2dp(90), width: width - 20, resizeMode: 'cover' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#f3f3f3' },
    }),
    scrollView: {
        marginBottom: 46
    },
    header: {
        backgroundColor: '#0398ff',
        height: headH,
        paddingTop: px2dp(isIOS ? 30 : 10),
        paddingHorizontal: 16,
    },
    lbsWeather: {
        height: inputHeight,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    weather: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    lbs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBtn: {
        borderRadius: inputHeight,
        height: inputHeight,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    collectionView: {
        paddingBottom: 10,
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap"//换行
    },
    collectionViewCell: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
});