
'use strict';

import React, {
    Component
} from 'react'

import {
    View,
    Dimensions,
    Image,
    Text,
    ListView,
    ScrollView,
    StyleSheet,
    Platform,
    RefreshControl
} from 'react-native'

import NavigationBar from '../component/navigationbar'
import Swiper from 'react-native-swiper'
import Images from '../pliers/images'
import px2dp from '../pliers/screenPx'
import ToolBar from '../component/buyBar.js'

let { width, height } = Dimensions.get('window')

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false
        }
    }

    back() {
        this.props.navigator.pop()
    }
    share() {

    }

    _progress() {
        return (
            <View style={{
                backgroundColor: '#f3f3f3', borderRadius: 5, height: 15, marginLeft: 10,marginRight:10
            }}>
                <View style={{ flex: 1, width: 70, backgroundColor: '#FFBC46', borderRadius: 5 }}>
                </View>
            </View>
        )
    }

    _onRefresh() {
         this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false })
        }, 2000)
    }

    _renderAd() {
        let Ads = ['imac', 'imac2', 'imac3']
        return Ads.map((name, index) => {
            return (
                <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Images[name]} style={{ width: width, resizeMode: 'contain' }} />
                </View>
            )
        })
    }

    _renderHeader() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <Swiper
                    height={height / 3}
                    paginationStyle={{ bottom: 10 }}
                    dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                    activeDotStyle={{ backgroundColor: '#FF4D09', width: 6, height: 6 }}>
                    {this._renderAd()}
                </Swiper>
                {this._renderDetail()}
            </View>
        )
    }

    _renderDetail() {
        return (
            <View style={{ marginTop: 1, backgroundColor: '#fff' }}>
                <Text style={{ marginLeft: 15, marginRight: 17, fontSize: 15, lineHeight: 22 }}>Apple iMac 21.5英寸一体机（双核 Core i5 处理器/8GB内存/1TB存储 MK142CH/A）{'\n'}
                    <Text style={{ color: 'red' }}>本商品由第三方商家指定4s点提供并发货,颜色随机,含保险,不含购置税及上牌费,参与前请仔细阅读活动说明!</Text>
                </Text>
            </View>
        )
    }

    _renderConditions() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.progress}>
                    {this._progress()}
                </View>
                <View style={styles.conditionsWrap}>
                    <Text style={styles.conditions}>期号 {}</Text>
                    <Text style={styles.conditions}>参与人数 {}</Text>
                </View>
            </View>
        )
    }


    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (<View style={styles.contain}>
            <NavigationBar style={{ backgroundColor: "transparent" }} leftImage={Images.back} leftAction={this.back.bind(this)} />
            <ScrollView
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        colors={['#ddd', '#0398ff']}//a
                        onRefresh={this._onRefresh.bind(this)}
                        progressBackgroundColor='black'//a
                    />
                }
            >

                {/*#pragma mark - ('')*/}
                {this._renderHeader()}

                {/*#pragma mark - ('')*/}
                {this._renderConditions()}
            </ScrollView>
            <View style={{width:width,height:40}}>
                <ToolBar style={{flex:1,backgroundColor:'red'}}/>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#f3f3f3' },
    }),
    conditions: {
        marginLeft: px2dp(10),
        marginTop:10,
        color: '#6f6f6f',
        height: px2dp(15),
        fontSize: 11,
    },
    conditionsWrap: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
    },
    progress: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        height: px2dp(40),
        justifyContent: 'center',
    }
})