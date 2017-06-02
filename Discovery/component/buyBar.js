'use strict';

import React, {
    Component
} from 'react'

import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Platform,
    TouchableNativeFeedback
} from 'react-native'

const { width, height } = Dimensions.get('window')
const isIOS = Platform.OS == "ios"

import px2dp from '../pliers/screenPx'

export default class BuyBar extends Component {
    constructor(props) {
        super(props)
    }

    _renderItem() {
        let sources = ['查看', '收藏', '走势', '加入清单', '立即参与']
        let colors = ['#848484', '#848484', '#848484', '#fff', '#fff']
        let backgroundColor = ['#fff', '#fff', '#fff', '#fe9404', '#fe5000']
        const { title } = this.props
        let item = () => {
            return (
                <View style={{ flex: 1, flexDirection: 'row', borderTopColor: '#f3f3f3', borderTopWidth: px2dp(1) }}>
                    {
                        sources.map((title, index) => {
                            return (
                                <View key={index} style={{ backgroundColor: index > 2 ? backgroundColor[index] : '#fff', width: index > 2 ? width * 1 / 3 : width / 9, justifyContent: 'center', alignItems: 'center', borderRightColor: index > 2 ? null : '#f3f3f3', borderRightWidth: index > 2 ? 0 : 1 }}>
                                    {/*<Image source={imageName}/>*/}
                                    <Text style={{ fontSize: index > 2 ? 13 : 10, color: index > 2 ? '#fff' : '#848484' }}>{title}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            )

        }

        return (
            isIOS ? (
                <TouchableWithoutFeedback onPress={this.props.onPress.bind(this)}>
                    {item()}
                </TouchableWithoutFeedback>
            ) : (
                    <TouchableNativeFeedback>
                        {item()}
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