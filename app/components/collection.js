/**
 * Created by arjun on 26/01/17.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import CollectionStore from '../stores/collections';
import Mixtape from './mixtape';

export default class collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mixtapes: [],
            loading: true
        }
        CollectionStore.getMixtapes(props.id)
            .then(res => {
                this.setState({
                    mixtapes: res.data.results,
                    loading: false
                });
            })
    }

    render() {
        return (
            <ScrollView
                horizontal={true} >
                {this.state.mixtapes.map( mixtape => {
                    return (<Mixtape key={mixtape.id} details={mixtape} {...this.props} />)
                })}
            </ScrollView>
        );
    }

}

