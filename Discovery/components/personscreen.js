"use strict";

import React, {Component} from "react";
import {View, StyleSheet, Platform, Button} from "react-native";

const styles = StyleSheet.create({
    contain: Platform.select({
        android: {},
        ios: {paddingTop: 20}
    })
});

export default class Person extends Component {
    static navigationOptions = {
        title: 'Person'
    };

    constructor(props) {
        super(props);
        this.state = {
            text: "你好",
            navigate: this.props.navigation.navigate
        }
    }

    onPress = () => {
        this.state.navigate("List",
            {
                data: "你好",
                callback: (data) => {
                    this.setState({text: data});
                }
            });
    };
    
    render() {
        const {text} = this.state;
        return (
            <View style={styles.contain}>
                <Button
                    title={''}
                    onPress={this.onPress}
                />
            </View>
        );
    }
}
