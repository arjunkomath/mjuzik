/**
 * Created by arjun on 26/01/17.
 */
import {autorun, observable} from "mobx";
import axios from 'axios';
import {Platform} from 'react-native';
import {
    Player
} from 'react-native-audio-toolkit';
import constants from '../config/constants';

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

class PlayerStore {
    @observable playerState = MediaStates.DESTROYED;
    @observable isPlaying = false;
    @observable title = null;
    @observable player = null;
    @observable currentTime = 0;

    interval = null;

    play(url, title) {

        // Add client ID
        url = url + '?client_id=' + constants.client_ids.sound_cloud;

        if (this.player) {
            this.player.destroy();
        }

        var self = this;
        this.title = title;
        this.playerState = MediaStates.LOADING;
        this.player = new Player(url, {
            continuesToPlayInBackground: true
        }).prepare(err => {
            this.playerState = this.player.state;
            if(this.playerState >= 2)
                this.isPlaying = true;
            if (err) {
                console.error(err);
            }
            this.player.play();
            this.interval = setInterval(() => {
                self.playerState = self.player.state;
                self.currentTime = self.player.currentTime;
                if (self.playerState == MediaStates.PREPARED) {
                    clearInterval(self.interval);
                    self.interval = null;
                    self.title = '';
                    self.player.destroy();
                    self.playerState = MediaStates.DESTROYED;
                    self.isPlaying = false;
                    self.player = null;
                }
            }, 500);
        });
    }

    logPlayback(trackId) {
        axios({
            method: 'post',
            url: constants.api_base_url + '/events/plays/' + trackId + '/',
            headers: {
                'Accept': 'application/json; version=' + constants.version,
                'Client': constants.client_ids[Platform.OS]
            }
        }).then(res => {
            // console.info(res);
        }).catch(error => {
            console.error(error);
        })
    }

}

var store = new PlayerStore

autorun(() => {
    console.log('Player State', store.playerState);
})

export default store

