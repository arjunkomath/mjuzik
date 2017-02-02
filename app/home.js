import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';

import {observer} from 'mobx-react/native';
import CollectionStore from './stores/collections';

import Collection from './components/collection';
import Mixtape from './components/mixtape';
import MiniPlayer from './components/player';
import Spinner from 'react-native-spinkit';
import colors from './config/colors';
import PlayerState from './stores/player';
import {Carousel} from 'nachos-ui'

var {height, width} = Dimensions.get('window');

@observer
export default class home extends Component {

    constructor() {
        super();
        let self = this;
        this.state = {
            featured_mixtapes: []
        };
        CollectionStore.getCollections();
        CollectionStore.getMixtapes(482).then(mixtapes => {
            self.setState({
                featured_mixtapes: mixtapes.data.results
            })
        });
    }

    render() {
        const {label} = this.props;
        const {isLoading, collections} = CollectionStore;
        const {navigate} = this.props.navigation;

        const featured = this.state.featured_mixtapes.length ? (
                <Carousel
                    indicatorStyle={{color: colors.borderLight}}
                    indicatorActiveStyle={{color: colors.title}}
                    width={width}
                    height={width}
                    images={this.state.featured_mixtapes}>
                    {this.state.featured_mixtapes.map(details => {
                        return (
                            <TouchableOpacity
                                key={details.id}
                                onPress={() => {navigate('Tracks', { id: details.id, title: details.title, artwork: details.artwork_url })}}>
                                <Image
                                    style={{width: width, height: width}}
                                    source={{uri: details.artwork_url}}>
                                </Image>
                            </TouchableOpacity>
                        )
                    })}
                </Carousel>
            ) : (<View></View>);

        const list = isLoading ? (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner isVisible={true} size={30} type="Wave" color={colors.border}/>
                </View>
            ) : collections.map(rowData => {
                if (rowData.slug == 'feat')
                    return true;
                return (
                    <View key={rowData.id} style={styles.collectionItem}>
                        <Text style={styles.collectionTitle}>{rowData.title.toUpperCase()}</Text>
                        <Collection id={rowData.id} {...this.props} />
                    </View>
                )
            });

        return (
            <View style={styles.container}>
                <ScrollView style={[{flex: 1}, {marginBottom: PlayerState.isPlaying ? 80 : 0 }]}>
                    {featured}
                    <View style={styles.collections}>
                        {list}
                    </View>
                </ScrollView>
                <MiniPlayer/>
            </View>
        );
    }
}

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
        fontSize: 25,
        color: colors.title
    }
});