'use strict'

import React, { Component } from 'react'
import {
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    Image
} from 'react-native'

import Lucky from './luckyscreen'
import Find from './findscreen'
import Task from './taskscreen'
import Mine from './minescreen'

import TabNavigator from 'react-native-tab-navigator'
import Icon from 'react-native-vector-icons/Ionicons'

export default class TabBarController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentVisiableVc: 'Lucky',
            hidTabBar: false
        }
        this.rootVcConfigs = [
            ['手气', 'logo-google', 'Lucky', <Lucky {...this.props} />],
            ['发现', 'ios-compass-outline', 'Find', <Find {...this.props} />],
            ['任务', 'ios-list-box-outline', 'Task', <Task {...this.props} />],
            ['我的', 'ios-contact-outline', 'Mine', <Mine {...this.props} />]
        ]
    }
    static showTabBar(delay) {
        this.setState({ hidTabBar: false })
    }
    static hideTabBar(delay) {
        this.setState({ hideTabBar: true })
    }
    render() {
        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabbar]}
                sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                {
                    this.rootVcConfigs.map((item, i) => {
                        return (
                            <TabNavigator.Item
                                key={i}
                                tabStyle={styles.tabStyle}
                                title={item[0]}
                                selected={this.state.currentVisiableVc === item[2]}
                                selectedTitleStyle={{ color: "#3496f0" }}
                                renderIcon={() => <Icon name={item[1]} size={(22)} color="#666" />}
                                renderSelectedIcon={() => <Icon name={item[1].replace(/\-outline$/, "")} size={(22)} color="#3496f0" />}
                                onPress={() => this.setState({ currentVisiableVc: item[2] })}>
                                {item[3]}
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator>
        )
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabItemStyle: {
        padding: 4
    }
})