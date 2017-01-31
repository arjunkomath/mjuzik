/**
 * Created by arjun on 26/01/17.
 */
import {
    ListView,
    Platform
} from 'react-native';
import {autorun, observable, computed} from "mobx";
import axios from "axios";
import constants from "../config/constants";

class CollectionStore {
    @observable collections = []
    @observable isLoading = false;

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    @computed get dataSource() {
        return this.ds.cloneWithRows(this.collections.slice());
    }

    getCollections() {
        this.isLoading = true;
        let self = this;
        axios({
            method: 'get',
            url: constants.api_base_url + '/collections/',
            headers: {
                'Accept': 'application/json; version=' + constants.version,
                'Client': constants.client_ids[Platform.OS]
            }
        }).then(res => {
            this.collections = res.data.results;
            self.isLoading = false;
        }).catch(error => {
            console.error(error);
        })
    }

    getMixtapes(collectionId) {
        return axios({
            method: 'get',
            url: constants.api_base_url + '/mixtapes/',
            headers: {
                'Accept': 'application/json; version=' + constants.version,
                'Client': constants.client_ids[Platform.OS]
            },
            params: {
                collection: collectionId
            }
        })
    }

}

var collection = new CollectionStore
export default collection
