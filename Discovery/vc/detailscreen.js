
'use strict';

import React, {
    Component,
    PropTypes
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
    RefreshControl,
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../component/navigationbar'
import Swiper from 'react-native-swiper'
import Images from '../pliers/images'
import px2dp from '../pliers/screenPx'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import PayScreen from './payscreen'

let { width, height } = Dimensions.get('window')
const options = ['Cancel', '1', '2', '5']
const CANCEL_INDEX = 0
const isIOS = Platform.OS == "ios"

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            money: 1
        }
        this.showActionSheet = this.showActionSheet.bind(this)
    }

    back() {
        this.props.navigator.pop()
    }
    share() {

    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    actionSheetPress(i) {
        if (i > 0) {
            this.setState({ money: options[i] })
        }
    }

    _progress() {
        return (
            <View>
                <Text style={{ color: '#ff5f3e', fontWeight: 'bold', fontSize: px2dp(15), marginLeft: 10 }}>市场价￥7088.00</Text>
            </View>

            /*<View style={{ backgroundColor: '#f3f3f3', borderRadius: 5, height: 15, marginLeft: 10, marginRight: 10}}>
                <View style={{ flex: 1, width: 70, backgroundColor: '#FFBC46', borderRadius: 5 }}>
                </View>
            </View>*/
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
                {this._renderGoods()}
            </View>
        )
    }

    _renderGoods() {
        return (
            <View style={{ marginTop: 1, backgroundColor: '#fff' }}>
                <Text style={{ marginLeft: 15, marginRight: 17, fontSize: 15, lineHeight: 22 }}>Apple iMac 21.5英寸一体机（双核 Core i5 处理器/8GB内存/1TB存储 MK142CH/A）{'\n'}
                    {/*<Text style={{ color: 'red' }}>本商品由第三方商家指定4s点提供并发货,颜色随机,含保险,不含购置税及上牌费,参与前请仔细阅读活动说明!</Text>*/}
                </Text>
            </View>
        )
    }

    _renderDetail() {

    }

    _renderBuy() {

    }

    toolBarFunctions = () => {

        let check = () => {
            alert(1)
        }
        let like = () => {
            alert(2)
        }
        let trend = () => {
            alert(2)
        }
        let add = () => {
            alert(3)
        }
        let join = () => {
             this.props.navigator.push({
                 component:PayScreen,
                 args:{}
             })
        }
        return [check, like, trend, add, join]
    }

    _renderConditions() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
                <View style={styles.progress}>
                    {this._progress()}
                </View>
                <View style={styles.conditionsWrap}>
                    <TouchableWithoutFeedback>
                        <View style={styles.view}>
                            <Text style={styles.conditions}>{'期号: 1212003032010'}</Text>
                            <Image source={Images.arrow} style={{ width: px2dp(8), height: px2dp(8), resizeMode: 'contain', marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <View style={styles.view}>
                            <Text style={styles.conditions}>{'参与人次: 178人次'}</Text>
                            <Image source={Images.arrow} style={{ width: px2dp(8), height: px2dp(8), resizeMode: 'contain', marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={styles.view}>
                            <Text style={styles.conditions}>{'目标人次: 730人次'}</Text>
                            <Image source={Images.arrow} style={{ width: px2dp(8), height: px2dp(8), resizeMode: 'contain', marginRight: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <TouchableWithoutFeedback onPress={this.showActionSheet.bind(this)}>
                    <View style={styles.chooseType}>
                        <Text style={{ fontSize: 14, marginLeft: 10 }}>{'已选: ' + this.state.money + '元'}</Text>
                        <Image source={Images.arrow} style={{ width: px2dp(8), height: px2dp(8), resizeMode: 'contain', marginRight: 10 }} />
                    </View>
                </TouchableWithoutFeedback>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title='金额选择'
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.actionSheetPress.bind(this)}
                />
                <View style={{ marginTop: 8 }}>
                </View>

            </View>
        )
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (<View style={styles.contain}>
            <NavigationBar style={{ backgroundColor: "#fff" }} leftImage={Images.back} leftAction={this.back.bind(this)} />
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
            <View style={{ width: width, height: 40 }}>
                <ToolBar style={{ flex: 1 }} functions={this.toolBarFunctions()} />
            </View>
        </View>)
    }
}

export class ToolBar extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        titles: PropTypes.string,
        backgroundColors: PropTypes.string,
        functions: PropTypes.array
    }

    _renderItem() {
        let sources = ['查看', '收藏', '走势', '加入清单', '立即参与']
        let color = ['#848484', '#848484', '#848484', '#fff', '#fff']
        let backgroundColor = ['#fff', '#fff', '#fff', '#fe9404', '#fe5000']
        const { title } = this.props
        let item = () => {
            return (
                <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#f3f3f3', borderTopWidth: px2dp(1) }}>
                    {
                        sources.map((title, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={this.props.functions[index]}>
                                    <View style={{ backgroundColor: index > 2 ? backgroundColor[index] : '#fff', width: index > 2 ? width * 1 / 3 : width / 9, justifyContent: 'center', alignItems: 'center', borderRightColor: index > 2 ? null : '#f3f3f3', borderRightWidth: index > 2 ? 0 : 1 }}>
                                        {/*<Image source={imageName}/>*/}
                                        <Text style={{ fontSize: index > 2 ? 13 : 10, color: index > 2 ? '#fff' : '#848484' }}>{title}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            )
        }

        return (
            isIOS ? (
                <TouchableWithoutFeedback>
                    {item(...this.props)}
                </TouchableWithoutFeedback>
            ) : (
                    <TouchableNativeFeedback>
                        {item(...this.props)}
                    </TouchableNativeFeedback>
                )
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this._renderItem()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#fff' },
    }),
    conditions: {
        marginLeft: px2dp(10),
        color: '#6f6f6f',
        fontSize: 11,
        justifyContent: 'center'
    },
    conditionsWrap: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    progress: {
        height: px2dp(40),
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    chooseType: {
        height: 36,
        backgroundColor: '#fff',
        marginTop: 8,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    view: {
        flex: 1,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(25)
    }
})