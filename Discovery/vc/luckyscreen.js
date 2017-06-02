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
    TouchableOpacity,
    ListView
} from "react-native";

import px2dp from '../pliers/screenPx'
import Icon from 'react-native-vector-icons/Ionicons'
import Images from '../pliers/images'
import Swiper from 'react-native-swiper'
import Rank from '../component/rank'
import data from '../pliers/virtualData'
import DetailPage from './detailscreen'

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

    render() {
        const { text } = this.state;
        return (
            <View style={styles.contain}>
                <ScrollView
                    styles={styles.scrollView}
                    scrollEventThrottle={16}//每秒触发ScrollView事件流16次,防止占用内存
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
                        {/*<TouchableOpacity>
                            <View style={{ height: px2dp(90), paddingHorizontal: 10 }}>
                                <Image source={Images.ad1} style={{ height: px2dp(90), width: width - 20, resizeMode: 'cover' }} />
                            </View>
                        </TouchableOpacity>*/}
                    </View>

                    {/*#pragma mark - ('热门区域')*/}
                    <View style={styles.hotView}>
                        {this._rendHot()}
                    </View>

                    {/*#pragma mark - ('抢购')*/}
                    <View style={styles.card}>
                        {this._renderSaleTime()}
                    </View>

                    {/*#pragma mark - ('')*/}
                    {/*<View style={styles.card}>
                        {this._renderFamous()}
                    </View>*/}

                    {/*#pragma mark - ('')*/}
                    <View style={styles.card}>
                        {this._renderGift()}
                    </View>

                    {/*#pragma mark - ('')*/}
                    <View style={styles.card}>
                        {this._renderRank()}
                    </View>

                </ScrollView>
            </View>
        );
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
        let imgs = ['bird', 'camera', 'computer', 'car', 'watch', 'phone', 'money', 'gold', 'card', 'food', 'bed', 'sofa', 'clothes', 'shoe']
        let renderSwipeView = (types, n) => {
            return (
                <View style={styles.collectionView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{ width: w, height: h }, styles.collectionViewCell]}>
                                    <Image source={Images[n > 0 ? imgs[8 + i] : imgs[i]]} style={{ width: w * .5, height: w * .5, marginTop: 5 }} resizeMode='contain' />
                                    <Text style={{ fontSize: px2dp(12), color: "#666", marginTop: 8 }}>{item}</Text>
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
                {renderSwipeView(['官方推荐', '单反', '电脑', '汽车', '手表', '手机', '现金', '金银制品'], 0)}
                {renderSwipeView(['充值卡', '零食', '床上用品', '家具', '服饰', '鞋子'], 6)}
            </Swiper>
        )
    }

    _rendHot() {
        return ['热门宝贝', '返幸运币', '多倍竞猜', '苹果专区'].map((title, index) => {
            let sty = {
                0: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#f9f9f9',
                    borderRightWidth: 1,
                    borderRightColor: '#f9f9f9'
                },
                1: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#f9f9f9'
                },
                2: {
                    borderRightWidth: 1,
                    borderRightColor: '#f9f9f9'
                },
                3: {}
            }
            let _render = (index) => {
                return (
                    <View style={styles.hotWarpper}>
                        <View>
                            <Text style={{ fontSize: px2dp(14), color: '#333', marginBottom: 5 }}>{title}</Text>
                            <Text style={{ fontSize: px2dp(12), color: '#bbb' }}>{title}</Text>
                        </View>
                        <Image source={Images['hot' + index]} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                    </View>
                )
            }
            return isIOS ? (
                <View key={index} style={[styles.hotItem, sty[index], { backgroundColor: '#f5f5f5' }]}>
                    <TouchableHighlight style={{ flex: 1 }} onPress={() => { }}>{_render(index)}
                    </TouchableHighlight>
                </View>
            ) : (
                    <View key={index} style={[styles.hotItem, sty[index]]}>
                        <TouchableNativeFeedback style={{ flex: 1, height: 70 }}>{_render(index)}
                        </TouchableNativeFeedback>
                    </View>
                )
        })
    }

    _renderSaleTime() {
        return (
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: px2dp(14), fontWeight: "bold" }}>马上揭晓</Text>
                        <Text style={{ fontSize: px2dp(11), color: "#aaa", marginLeft: 10 }}>距离揭晓</Text>
                        <Text style={styles.time}>01</Text>
                        <Text style={{ fontSize: px2dp(11), color: "#aaa" }}>:</Text>
                        <Text style={styles.time}>07</Text>
                        <Text style={{ fontSize: px2dp(11), color: "#aaa" }}>:</Text>
                        <Text style={styles.time}>10</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: px2dp(12), color: "#aaa", marginRight: 3 }}>更多</Text>
                            <Icon name="ios-arrow-forward-outline" size={px2dp(13)} color="#bbb" />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 15 }}>
                        {
                            ["iPhone7", "佳能600D", "AdidasZ50", "哈佛H7"].map((item, i) => {
                                let layout = (
                                    <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                                        <Image source={Images["sale" + i]} style={{ height: px2dp(85), width: px2dp(85), resizeMode: 'cover' }} />
                                        <Text style={{ fontSize: px2dp(13), color: "#333", marginVertical: 5 }}>{item}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontSize: px2dp(14), fontWeight: "bold", color: "#ff6000", marginRight: 2 }}>{"￥99"}</Text>
                                            <Text style={{ fontSize: px2dp(12), color: "#aaa", textDecorationLine: "line-through" }}>{"￥29"}</Text>
                                        </View>
                                    </View>
                                )
                                return isIOS ? (
                                    <TouchableHighlight key={i} style={{ borderRadius: 4, marginRight: 10 }} onPress={() => { }}>{layout}</TouchableHighlight>
                                ) : (
                                        <View key={i} style={{ marginRight: 10 }}><TouchableNativeFeedback onPress={() => { }}>{layout}</TouchableNativeFeedback></View>
                                    )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    _renderFamous() {
        return (
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: px2dp(14), fontWeight: "bold" }}>品质优选</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: px2dp(12), color: "#aaa", marginRight: 3 }}>更多</Text>
                            <Icon name="ios-arrow-forward-outline" size={px2dp(13)} color="#bbb" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", paddingTop: 15 }}>
                    {
                        ["田老师红烧肉", "必胜宅急送", "嘉和一品", "西贝莜面村", "宏状元", "汉拿山韩式石锅拌饭", "U鼎冒菜", "阿香米线"].map((item, i) => {
                            let size = px2dp((width - px2dp(120)) / 4)
                            let layout = (
                                <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
                                    <Image source={Images["nice" + i]} style={{ height: size, width: size, resizeMode: 'cover' }} />
                                    <Text numberOfLines={1} style={{ fontSize: px2dp(12), width: size, color: "#333", marginVertical: 5 }}>{item}</Text>
                                    <Text numberOfLines={1} style={styles.qtag}>{"大牌精选"}</Text>
                                </View>
                            )
                            return isIOS ? (
                                <View key={i} style={{ borderRadius: 4, marginRight: 10, paddingTop: i > 3 ? 30 : 0 }}><TouchableHighlight onPress={() => { }}>{layout}</TouchableHighlight></View>
                            ) : (
                                    <View key={i} style={{ marginRight: 10, paddingTop: i > 3 ? 30 : 0 }}><TouchableNativeFeedback onPress={() => { }}>{layout}</TouchableNativeFeedback></View>
                                )
                        })
                    }
                </View>
            </View>
        )
    }
    _renderGift() {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={[styles.gift, { paddingRight: 16 }]}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{"推荐有奖"}</Text>
                        <Text style={{ fontSize: 12, color: "#aaa", marginTop: 5 }}>{"幸运币拿不停"}</Text>
                    </View>
                    <Image source={Images.coupon0} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
                </View>
                <View style={[styles.gift, { borderLeftColor: "#f5f5f5", borderLeftWidth: 1, paddingLeft: 16 }]}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{"任务中心"}</Text>
                        <Text style={{ fontSize: 12, color: "#aaa", marginTop: 5 }}>{"快来赚幸运币!"}</Text>
                    </View>
                    <Image source={Images.coupon1} style={{ height: 50, width: 50, resizeMode: 'cover' }} />
                </View>
            </View>
        )
    }

    _renderRank() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let renderRow = (rowData, SectionId, rowID) => {
            rowData.onPress = () => {
                this.props.navigator.push({
                    component: DetailPage,
                    args: {}
                })
            }
            return (
                <Rank {...rowData} />
            )
        }
        return <ListView
            dataSource={ds.cloneWithRows(data.list)}
            renderRow={renderRow.bind(this)}
            enableEmptySections={true} />
    }
}

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#f3f3f3' },
    }),
    scrollView: {
        marginBottom: px2dp(46)
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
    hotWarpper: {
        flex: 1,
        height: 70,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hotItem: {
        width: width / 2,
        height: width / 2 / 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row'
    },
    hotView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 10,
        flexWrap: 'wrap'
    },
    card: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    saleTime: {
        paddingHorizontal: 3,
        backgroundColor: '#333',
        fontSize: px2dp(11),
        color: '#fff',
        marginHorizontal: 3
    },
    gift: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff"
    },
});