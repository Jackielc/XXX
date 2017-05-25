"use strict"

// import Home from './homescreen'
// import Find from './findscreen'
// import Person from './personscreen'
// import Push from './push'

import React, { Component } from 'react'
import { View, StatusBar, Platform, Text } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import ScrollView from './tabbarcontroller'

export default class Navigation extends Component {
    constructor(prop) {
        super(prop)
    }
    render() {
        return Platform.OS == 'ios' ? (
            <Navigator //ios
                initialRoute={{ component: Warpper }}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args} />
                  }
                }
            />
        ) : ( //andriod
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor='#0398ff'
                        barStyle='light-content'
                    />
                    <Navigator
                        initialRoute={{ component: Warpper }}
                        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                        renderScene={(route, navigator) => {
                            return <route.component navigator={navigator} {...route.args} />
                          }
                        }
                    />
                </View>
            )
    }
}

class Warpper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' ,backgroundColor:'lightgray'}}>
                <ScrollView navigator={this.props.navigator}/>
            </View>
        )
    }
}