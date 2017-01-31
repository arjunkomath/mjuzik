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

export default class mixtape extends Component {

    render() {

        const {details} = this.props;
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
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
            </View>
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
        marginLeft: 5,
        marginTop: -20,
        fontSize: 14,
        backgroundColor: 'transparent',
        color: colors.main_bg
    },
    artwork: {
        width: 150,
        height: 150
    }
});

