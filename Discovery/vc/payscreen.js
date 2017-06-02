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
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native'

import Images from '../pliers/images'
import px2dp from '../pliers/screenPx'
import NavigationBar from '../component/navigationbar'
import Icon from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')

export default class Buy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hideen: [false, true, true]
        }
    }

    back() {
        this.props.navigator.pop()
    }

    _onPress(index) {
        let judges = this.state.hideen
        for (var i = 0; i < judges.length; i++) {
            if (i = index) {
                judges[i] = false   
            }else{
                judges[i] = true
            }
        }
        this.setState({
            hideen: judges
        })
        console.log(this.state.hideen)
    }

    _renderCheck() {
        return (
            <Icon name='ios-checkmark' size={px2dp(26)} style={{ marginRight: 20, alignSelf: 'center' }} />
        )
    }

    render() {
        let sources = [{ title: '支付宝', image: 'alipay' }, { title: '微信', image: 'wechat' }, { title: '银联', image: 'unionPay' }];
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <NavigationBar style={{ backgroundColor: "#fff" }} leftImage={Images.back} leftAction={this.back.bind(this)} />
                <View style={{ backgroundColor: '#EEEEEE', height: px2dp(30), justifyContent: 'center' }}>
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>选择支付方式</Text>
                </View>

                <View style={{ height: px2dp(200), justifyContent: 'space-around', backgroundColor: '#fff' }}>
                    {
                        sources.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={this._onPress.bind(this, index)}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: px2dp(20), justifyContent: "space-between", borderBottomColor: '#eeeeee', borderBottomWidth: 1 }}>
                                        <Image source={Images[item.image]} style={{ width: px2dp(40), height: px2dp(40), resizeMode: 'contain', alignSelf: 'center' }} />

                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}