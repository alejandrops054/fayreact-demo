import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import * as NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {
  renderTiendas,
  searchFilterFunction,
  setCurrentTienda,
  setLoading,
} from '../../redux/actions/tiendasActions';

const TiendasScreen = ({
  navigation,
  renderTiendas,
  searchFilterFunction,
  setCurrentTienda,
  setLoading,
  tiendas: {filteredData, loading, search},
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    renderTiendas();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    const conexion = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        renderTiendas();
      }
    });
  }, []);

  useEffect(() => {
    renderFooter();
  }, [loading]);

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => {
        setCurrentTienda(item);
        navigation.navigate('Camp', {
          tienda_id: item.id,
          tienda_titulo: item.tienda_nombre,
        });
      }}>
      <ListItem.Content>
        <ListItem.Title>
          {item.tienda_nombre} - ({item.tienda_clave})
        </ListItem.Title>
        <ListItem.Subtitle>{item.cadena_nombre}</ListItem.Subtitle>
        <Text>{item.porcentaje}%</Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const renderHeader = () => (
    <SearchBar
      round
      inputContainerStyle={styles.searchBar}
      containerStyle={styles.searchBarContainer}
      searchIcon={{size: 24}}
      onChangeText={text => searchFilterFunction(text)}
      onClear={text => searchFilterFunction('')}
      placeholder="Buscar Tienda..."
      value={search}
      inputStyle={{color: '#000000'}}
      placeholderTextColor="#000000"
    />
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator
          animating
          size="large"
          color="#606764"
          style={styles.spinner}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 275,
  },
  searchBar: {
    backgroundColor: '#ABAAAA',
  },
  searchBarContainer: {
    backgroundColor: '#FFFFFF',
  },
});

const mapStateToProps = state => ({
  tiendas: state.tiendas,
});

export default connect(mapStateToProps, {
  renderTiendas,
  searchFilterFunction,
  setCurrentTienda,
  setLoading,
})(TiendasScreen);
