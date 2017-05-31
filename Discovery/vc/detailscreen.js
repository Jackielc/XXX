
'use strict';

import React, {
    Component
} from 'react'

import {
    View,
    Dimensions,
    Image
} from 'react-native'

import NavigationBar from '../component/navigationbar'
import Swiper from 'react-native-swiper'
import Images from '../pliers/images'

let { width, height } = Dimensions.get('window')

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    back() {
        this.props.navigator.pop()
    }
    share() {

    }

    _renderAd() {
        let Ads = ['imac', 'imac2', 'imac3']
        return Ads.map((name, index) => {
            return (
                <View key={index} style={{ width:width,height:height/3 }}>
                    <Image source={Images[name]} resizeMode='contain' />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <NavigationBar
                    title=''
                    style={{ backgroundColor: "transparent", position: "absolute", top: 0, width }}
                    leftIcon="ios-arrow-back"
                    leftPress={this.back.bind(this)}
                    rightIcon="ios-more"
                    rightPress={this.share.bind(this)}
                />
                <Swiper
                    height={height / 3}
                    paginationStyle={{ bottom: 10 }}
                    dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                    activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6 }}>
                    {this._renderAd()}
                </Swiper>
            </View>
        )
    }
}