"use strict";

import React, {Component} from "react";
import {View, StyleSheet, Platform, Button} from "react-native";

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: {paddingTop: 20}
    })
});

export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Mine",
        }
    }
    render() {
        const {text} = this.state;
        return (
            <View style={styles.contain}>
                
            </View>
        );
    }
}
