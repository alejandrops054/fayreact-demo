import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {FAB, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {setCurrentCamp, getCamps} from '../../redux/actions/campsActions';

const CampScreen = ({
  route,
  navigation,
  setCurrentCamp,
  getCamps,
  campanas: {camps, currentCamp},
}) => {
  const {tienda_id} = route.params;
  const [value, onChangeText] = useState(route.params.tienda_titulo);

  useEffect(() => {
    getCamps(tienda_id);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: value === '' ? 'No title' : value,
    });
  }, [navigation, value]);

  const navigateToCamp = item => {
    setCurrentCamp(item);
    navigation.navigate('Detalles');
  };

  const renderItem = ({item}) => (
    <ListItem bottomDivider onPress={() => navigateToCamp(item)}>
      <ListItem.Content>
        <ListItem.Title>{item.camp_nombre}</ListItem.Title>
        <ListItem.Subtitle>{item.concepto}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <>
      <View style={styles.container}>
        <View>
          <FlatList
            data={camps.data}
            renderItem={renderItem}
            keyExtractor={item => item.info_id}
          />
        </View>
        {/*<FAB
          style={styles.fab}
          icon={{
            name: 'camera-alt',
            size: 25,
            color: 'white',
          }}
          color={'#F9362C'}
          onPress={() => navigation.navigate('Camara')}
        />
        */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  campanas: state.camps,
});

export default connect(mapStateToProps, {setCurrentCamp, getCamps})(CampScreen);
