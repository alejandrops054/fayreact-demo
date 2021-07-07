import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Badge, Button, Card, Text, Avatar} from 'react-native-elements';
import {API_AVATAR} from '@env';
import {userF} from '../../AuthProvider';
import {connect} from 'react-redux';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Sincronizar = ({
  camara: {imagenes, numeroDeFotos},
  detalles: {imagenesSubidas, imagenesNoSubidas},
}) => {
  const [connection, setConnection] = useState(false);
  const [userAvatar, setUserAvatar] = useState(API_AVATAR + userF.id);
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    console.log('Imagenes subidas:\n', imagenesSubidas);
    console.log('Imagenes NO subidas:\n', imagenesNoSubidas);
  }, [imagenesSubidas, imagenesNoSubidas]);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnection(state.isConnected);
    });
  }, [connection]);

  let imgsSubidas = imagenesSubidas.map((val, key) => {
    return (
      <TouchableWithoutFeedback key={key}>
        <View>
          <Image source={{uri: val.imagen}} />
        </View>
      </TouchableWithoutFeedback>
    );
  });

  return (
    <SafeAreaView>
      <Avatar
        size="large"
        source={{uri: userAvatar}}
        containerStyle={{
          marginTop: 10,
          marginLeft: 150,
        }}
      />
      <View style={styles.container}>
        <Badge
          status={connection ? 'success' : 'error'}
          badgeStyle={{
            width: 25,
            height: 25,
            borderRadius: 50,
          }}
        />
        <Text>{connection ? 'En línea' : 'Sin Acceso a internet'}</Text>
      </View>
      <Card containerStyle={{width: dimensions.screen.width - 30}}>
        <Card.Title>Imagenes Subidas: {imagenes.length}</Card.Title>
        <Card.Divider />
        {imgsSubidas}
      </Card>

      <Card containerStyle={{width: dimensions.screen.width - 30}}>
        <Card.Title>
          Imagenes <Text style={{color: 'red'}}>No</Text> Subidas: 0
        </Card.Title>
        <Card.Divider />
      </Card>
      <Button title="Sincronizar" buttonStyle={styles.btn}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 10,
    width: screen.width - 30,
    backgroundColor: 'red',
  },
});

const mapStateToProps = state => ({
  camara: state.camara,
  detalles: state.detalles,
});

export default connect(mapStateToProps, {})(Sincronizar);
