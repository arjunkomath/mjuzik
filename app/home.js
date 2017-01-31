import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';

import {observer} from 'mobx-react/native';
import CollectionStore from './stores/collections';

import Collection from './components/collection';
import MiniPlayer from './components/player';
import Spinner from 'react-native-spinkit';

@observer
export default class home extends Component {

    constructor() {
        super();
        CollectionStore.getCollections();
    }

    renderRow = (rowData) => {
        return (
            <View style={styles.collectionItem}>
                <Text style={styles.collectionTitle}>{rowData.title.toUpperCase()}</Text>
                <Collection id={rowData.id} {...this.props} />
            </View>
        )
    }

    render() {
        const {label} = this.props;
        const {isLoading} = CollectionStore;

        const list = isLoading ? (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner isVisible={true} size={30} type="Wave" color="#748CAB"/>
            </View>
        ) : (
            <ListView
                dataSource={CollectionStore.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
            />
        );

        return (
            <View style={styles.container}>
                <View style={styles.collections}>
                    {list}
                    {/*<Image source={require('../assets/images/sc.png')} />*/}
                </View>
                <MiniPlayer/>
            </View>
        );
    }
}

import colors from './config/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.main_bg
    },
    collections: {
        flex: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20
    },
    collectionItem: {
        flex: 1,
        marginBottom: 10
    },
    collectionTitle: {
        fontSize: 20,
        color: colors.title
    }
});