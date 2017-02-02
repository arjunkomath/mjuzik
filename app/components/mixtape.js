/**
 * Created by arjun on 26/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class mixtape extends Component {

    render() {

        const {details} = this.props;
        const {navigate} = this.props.navigation;

        return (
            <Animatable.View animation="zoomIn" delay={this.props.delay || 0} style={styles.container}>
                <TouchableOpacity
                    onPress={() => {navigate('Tracks', { id: details.id, title: details.title, artwork: details.artwork_url })}}>
                    <Image
                        style={styles.artwork}
                        source={{uri: details.artwork_url}}>
                        <Image
                            style={styles.artwork}
                            source={require('../../assets/images/row_bag.png')} />
                    </Image>
                </TouchableOpacity>
                <Text style={styles.title}>{details.title}</Text>
            </Animatable.View>
        );
    }

}

import colors from '../config/colors';
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        marginLeft: 10,
        marginTop: -22,
        fontSize: 14,
        backgroundColor: 'transparent',
        color: colors.main_bg
    },
    artwork: {
        width: 150,
        height: 150
    }
});

