/**
 * mjuzik React Native App
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Home from './app/home';
import Label from './app/stores/label';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends Component {

    static navigationOptions = {
        title: 'mjuzik'
    };

    render() {
        return (
            <Home label={Label} {...this.props} />
        );
    }

}

import Tracks from './app/tracks';

const mjuzik = StackNavigator({
    Home: { screen: HomeScreen },
    Tracks: {screen: Tracks }
});

AppRegistry.registerComponent('mjuzik', () => mjuzik);
