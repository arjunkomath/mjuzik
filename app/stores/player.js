/**
 * Created by arjun on 26/01/17.
 */
import {autorun, observable} from "mobx";

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
    @observable title = null;
    @observable player = null;
    @observable currentTime = 0;

    interval = null;

    play(url, title) {

        // Add client ID
        url = url + '?client_id=' + constants.client_ids.sound_cloud;

        if(this.player) {
            this.player.destroy();
        }

        var self = this;
        this.title = title;
        this.playerState = MediaStates.LOADING;
        this.player = new Player(url, {
            continuesToPlayInBackground: true
        }).prepare( err => {
            this.playerState = this.player.state;
            if(err) {
                console.error(err);
            }
            this.player.play();
            this.interval = setInterval( () => {
                self.playerState = self.player.state;
                self.currentTime = self.player.currentTime;
                if(self.playerState == MediaStates.DESTROYED) {
                    clearInterval(self.interval);
                    self.interval = null;
                    self.title = '';
                    self.player.destroy();
                    self.playerState = MediaStates.DESTROYED;
                    self.player = null;
                }
            }, 500);
        });
    }

}

var store = new PlayerStore

autorun(() => {
    console.log('Player State', store.playerState);
})

export default store

