"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Platform,
    ScrollView,
    RefreshControl,
    Dimensions,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableHighlight
} from "react-native";
import NavigationBar from '../component/navigationbar'
import px2dp from '../pliers/screenPx'
import Images from '../pliers/images'
import Icon from 'react-native-vector-icons/Ionicons'

let { width, height } = Dimensions.get('window')

export default class Mine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false
        }
        this.config = [
            { icon: "ios-pin", name: "收货地址" },
            { icon: "ios-heart", name: "关注", color: "#fc7b53" },
            { icon: "logo-usd", name: "推荐有奖", color: "#fc7b53" },
            { icon: "ios-cart", name: "我的收获", color: "#94d94a" },
            { icon: "ios-medal", name: "参与记录", color: "#ffc636" },
            { icon: "ios-outlet", name: "待开奖" },
            { icon: "md-flower", name: "分享" },
        ]
    }

    _onRefresh() {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 1500)
    }

    _renderTools() {
        return this.config.map((item, index) => {
            return (
                <View key={index} style={styles.mineToolsItem}>
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Icon name={item.icon} size={px2dp(20)} style={{ textAlign: "center", flex: 1, justifyContent: 'center', marginTop: 20 }} color={item.color || "#4da6f0"} />
                            <Text style={{ textAlign: 'center', flex: 1 }}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }

    _renderHead() {
        return (
            <View style={{ flex: 1, alignItems: 'center',marginTop:20 }}>
                <TouchableWithoutFeedback onPress={this.rightIconPress.bind(this)}>
                    <Image source={Images.header} style={{ height: px2dp(70), width: px2dp(70), borderRadius: 35 }} />
                </TouchableWithoutFeedback>
                <Text style={{alignItems:'center',fontWeight: "bold",marginTop:10,color:'#fff',fontSize:20}}>卢德水</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <NavigationBar
                    leftIcon='ios-notifications-outline'
                    leftPress={this.leftIconPress.bind(this)}
                    rightIcon='ios-settings-outline'
                    rightPress={this.rightIconPress.bind(this)}
                />
                <ScrollView
                    style={{ flex: 1, backgroundColor: '#f3f3f3' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)} />}
                >

                    {/*#pragma mark - ('')*/}
                    <View style={{ minHeight: 140, backgroundColor: "#f3f3f3" }}>

                        {/*#pragma mark - ('')*/}
                        <View style={{ height: 150, backgroundColor: '#0398ff' }}>
                            {this._renderHead()}
                        </View>

                        {/*#pragma mark - ('')*/}
                        <View style={{ width: width, height: 60, backgroundColor: '#fff', flexDirection: 'row', }}>
                            <TouchableWithoutFeedback>
                                <View style={styles.numItem}>
                                    <Text style={{ color: "#ff5f3e", fontSize: (18), fontWeight: "bold", textAlign: "center" }}>{"47.0元"}</Text>
                                    <Text style={{ color: "#333", fontSize: (12), textAlign: "center", marginTop: px2dp(5) }}>{"账户余额"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <View style={[styles.numItem, { borderLeftWidth: px2dp(1), borderLeftColor: "#f5f5f5", borderRightWidth: px2dp(1), borderRightColor: "#f5f5f5" }]}>
                                    <Text style={{ color: "#6ac20b", fontSize: 18, textAlign: "center", fontWeight: "bold" }}>{"880个"}</Text>
                                    <Text style={{ color: "#333", fontSize: 12, textAlign: "center", marginTop: 5 }}>{"幸运币"}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    {/*#pragma mark - ('')*/}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: px2dp(20) }}>
                        {this._renderTools()}
                    </View>
                </ScrollView>

            </View>
        );
    }

    leftIconPress() {
    }
    rightIconPress() {
        console.log(1)

    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: px2dp(46),
        backgroundColor: "#0398ff"
    },
    userHead: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#0398ff"
    },
    numbers: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 74
    },
    numItem: {
        flex: 1,
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
    mineToolsItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        borderRightWidth: 1,
        borderRightColor: '#f9f9f9',
        backgroundColor: '#fff',
        width: width / 4,
        height: width / 4
    }
})