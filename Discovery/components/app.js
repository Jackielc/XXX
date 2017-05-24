"use strict"

import Home from './homescreen'
import Find from './findscreen'
import Person from './personscreen'
import Push from './push'

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

const TabNav = TabNavigator(
 {
     HomeTab:{screen:Home},
     FindTab:{screen:Find},
     PersionTab:{screen:Person},
 },{
     tabBarPosition:'bottom',
     animationEnabled:false,
     swipeEnabled:false,
 })
const StackNav = StackNavigator({
     Root:{screen:TabNav},
     Push:{screen:Push},
},{
    navigationOptions:{
        headerTitleStyle:{alignSelf:'center'}
    },
    mode:'card',
    headerMode:'none',
}) 

module.exports = StackNav;