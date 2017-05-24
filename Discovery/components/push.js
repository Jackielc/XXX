"use strict";

import React, {Component} from "react";
import {View, StyleSheet, Platform, Button,Image} from "react-native";

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: { backgroundColor:'transparent',
               alignItems:'flex-start',
               paddingTop: 20,
               paddingLeft:20,
               flexDirection:'row'
             }
    })
});

export default class Push extends Component {
    static navigationOptions = {
        title: 'Push'
    };
    constructor(props) {
        super(props);
        this.state = {
            text: "你好",
            navigate: this.props.navigation.navigate
        }
    }
    onPress = () => {
        this.props.navigation.goBack(null);
    };
    
    render() {
        const {text} = this.state;
        return (
            <View style={styles.contain}>
                <Image source={require('../img/bar-button-back-system_24x24_.png')}  style={{height:24,width:24}}></Image>
                <Button
                    title={text}
                    onPress={this.onPress}
                />
            </View>
        );
    }
}
