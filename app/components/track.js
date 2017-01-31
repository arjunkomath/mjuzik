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

import PlayerState from '../stores/player';
import moment from 'moment';

export default class track extends Component {

    _play = (url, title) => {
        PlayerState.play(url, title);
    }

    render() {

        const {track} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this._play(track.stream_url, track.title)}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.artwork} source={{uri: track.artwork_url}}/>
                        <View style={{flex: 1}}>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{track.title}</Text>
                            <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">{moment.utc(track.duration).format('mm:ss')} - {track.artist}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

import color from '../config/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: color.title
    },
    title: {
        fontSize: 14,
        color: color.title
    },
    artist: {
        fontSize: 12,
        marginTop: 5,
        color: color.subtitle
    },
    artwork: {
        marginRight: 10,
        width: 50,
        height: 50
    }
});

