import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    Platform
} from 'react-native';

import {observer} from 'mobx-react/native';
import TracksStore from './stores/tracks';
import Track from './components/track';
import MiniPlayer from './components/player';
import Spinner from 'react-native-spinkit';
import colors from './config/colors';

import PlayerState from './stores/player';

@observer
export default class tracks extends Component {

    static navigationOptions = {
        header: ({state, setParams}) => ({
            title: `${state.params.title}`
        })
    };

    constructor(props) {
        super(props);
        TracksStore.getTracks(props.navigation.state.params.id);
    }

    render() {

        const {state} = this.props.navigation;
        const {tracks, isLoading} = TracksStore;

        const track_view = isLoading ? (
                <View style={styles.container}>
                    <Image
                        style={styles.artwork}
                        source={{uri: state.params.artwork}}
                    >
                        <Image
                            style={styles.artwork}
                            source={require('../assets/images/row_bag.png')}/>
                    </Image>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner isVisible={true} size={30} type="Wave" color={colors.border}/>
                    </View>
                    <MiniPlayer/>
                </View>
            ) : (
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container,{marginBottom: PlayerState.isPlaying ? 80 : 0 }]}>
                        <Image
                            style={styles.artwork}
                            source={{uri: state.params.artwork}}
                        >
                            <Image
                                style={styles.artwork}
                                source={require('../assets/images/row_bag.png')}/>
                        </Image>
                        {tracks.map( (track, index) => {
                            return (<Track key={track.id} delay={index * 75} track={track}/>)
                        })}
                    </ScrollView>
                    <MiniPlayer/>
                </View>
            );

        return track_view;
    }

    componentWillUnmount() {
        TracksStore.tracks = [];
    }

}

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_bg
    },
    blur: {
        flexGrow: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignSelf: 'stretch',
        opacity: 1
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.subtitle,
        backgroundColor: 'transparent'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: colors.title,
        backgroundColor: 'transparent'
    },
    artwork: {
        width: width,
        height: height / 4
    }
});