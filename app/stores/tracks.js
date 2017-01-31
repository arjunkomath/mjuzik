/**
 * Created by arjun on 26/01/17.
 */
import {autorun, observable} from "mobx";
import axios from "axios";
import constants from "../config/constants";

class TracksStore {
    @observable tracks = []
    @observable isLoading = false

    getTracks(mixtapeId) {
        this.isLoading = true;
        var self = this;
        axios({
            method: 'get',
            url: constants.api_base_url + '/tracks/',
            headers: {
                'Accept': 'application/json; version=' + constants.version,
                'Client': constants.client_ids.ios
            },
            params: {
                mixtape: mixtapeId
            }
        }).then(function (res) {
            self.tracks = res.data.results;
            self.isLoading = false;
        }).catch(error => {
            console.error(error);
        });
    }

}

var store = new TracksStore
export default store

