/**
 * Created by arjun on 26/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {observer} from 'mobx-react/native';
import PlayerState from '../stores/player';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import Slider from 'react-native-slider';
import colors from '../config/colors';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

var MediaStates = {
    LOADING: -3,
    DESTROYED: -2,
    ERROR: -1,
    IDLE: 0,
    PREPARING: 1,
    PREPARED: 2,
    SEEKING: 3,
    PLAYING: 4,
    PAUSED: 5,
};

var swipeoutBtns = [
    {
        text: 'Stop',
        backgroundColor: colors.title,
        color: 'white',
        onPress: () => {
            PlayerState.stop();
        }
    }
];

@observer
export default class player extends Component {

    render() {

        const {playerState, currentTime, title, player} = PlayerState;

        if (playerState == MediaStates.LOADING || playerState == MediaStates.PREPARING) {
            return (
                <Animatable.View animation="slideInUp" style={styles.container}>
                    <View style={styles.playback}>
                        <Text numberOfLines={1} style={styles.text}>{title}</Text>
                    </View>
                    <Spinner style={styles.spinner} isVisible={true} size={30} type="Wave" color={colors.border}/>
                </Animatable.View>
            );
        }

        if (playerState < 2) {
            return (<View></View>);
        } else {
            const button = (playerState == MediaStates.PLAYING) ? (
                    <TouchableOpacity onPress={() => player.pause()}>
                        <Image
                            style={styles.button}
                            source={require('./../../assets/images/pause.png')}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => player.play()}>
                        <Image
                            style={styles.button}
                            source={require('./../../assets/images/play.png')}
                        />
                    </TouchableOpacity>
                );

            const slider = (playerState == MediaStates.PLAYING || playerState == MediaStates.PAUSED) ? (
                    <Slider
                        style={sliderStyles.container}
                        trackStyle={sliderStyles.track}
                        thumbStyle={sliderStyles.thumb}
                        minimumValue={0}
                        maximumValue={player.duration}
                        value={currentTime ? currentTime : 0}
                        thumbTouchSize={{width: 50, height: 40}}
                        onSlidingComplete={(value) => player.seek(value)}/>
                ) : (
                    <View></View>
                );

            return (
                <View style={styles.container}>
                    <View style={styles.playback}>
                        <Swipeout left={swipeoutBtns} style={styles.swipe}>
                            <Text numberOfLines={1} style={[styles.text]}>{title}</Text>
                            <Text
                                style={[styles.progress, styles.text]}>{ ( currentTime > 0 ? moment.utc(Math.floor(currentTime)).format('mm:ss') : '00:00' ) + ' / ' + moment.utc(Math.floor(player.duration)).format('mm:ss') }</Text>
                            {slider}
                        </Swipeout>
                    </View>
                    {button}
                </View>
            );
        }
    }

}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        left: 0,
        bottom: 0,
        height: 85,
        width: width,
        padding: 5,
        backgroundColor: colors.player.bg,
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipe: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    text: {
        color: colors.player.text,
        paddingLeft: 5
    },
    playback: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    progress: {
        fontSize: 12
    },
    spinner: {
        marginRight: 10,
        marginLeft: 10
    },
    button: {
        marginRight: 10,
        marginLeft: 10,
        width: 40,
        height: 40
    }
});

var sliderStyles = StyleSheet.create({
    container: {
        height: 20,
    },
    track: {
        height: 2,
        backgroundColor: colors.border,
    },
    thumb: {
        width: 12,
        height: 12,
        backgroundColor: colors.player.text,
        borderRadius: 12 / 2,
        shadowOffset: {width: 0, height: 0},
        marginTop: 1,
        shadowRadius: 2,
        shadowOpacity: 1,
    }
});

