import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, SpeedDial} from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {setNumeroFotos} from '../../redux/actions/camaraActions';
import ImageElement from '../../util/ImageElement';

const Galeria = ({
  navigation,
  setNumeroFotos,
  detalles: {imagenesSeleccionadas},
  camara: {imagenes},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(imagenesSeleccionadas);
  }, [imagenesSeleccionadas]);

  const subirImagenesSeleccionadas = () => {
    if (imagenesSeleccionadas.length === 0) {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Sin selección.',
          subTitle: `No se a seleccionado ninguna foto.`,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'danger',
          cancellable: true,
        },
        () => setOpen(!open),
      );
    } else {
      setNumeroFotos(imagenesSeleccionadas.length);
      navigation.navigate('Tiendas');
    }
  };

  const setModalVisible1 = (visible, imgKey) => {
    setModalImage(imagenes[imgKey].imagen);
    setModalVisible(visible);
  };

  let imgs = imagenes.map((val, key) => {
    return (
      <TouchableWithoutFeedback
        key={key}
        onPress={() => setModalVisible1(true, key)}>
        <View style={styles.imageWrap}>
          <ImageElement imgsrc={val} />
        </View>
      </TouchableWithoutFeedback>
    );
  });

  return (
    <SafeAreaView>
      <ScrollView>
        {imagenes.length === 0 ? (
          <Text h4 style={{margin: 20}}>
            No se han tomado fotos ...
          </Text>
        ) : (
          <View styles={{flex: 1}}>
            <Modal
              style={styles.modal}
              animationType={'fade'}
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {}}>
              <View style={styles.modal}>
                <Text
                  style={styles.text}
                  onPress={() => {
                    setModalVisible1(false, 0);
                  }}>
                  Cerrar
                </Text>
                <Image
                  source={{uri: 'file://' + modalImage}}
                  style={styles.image}></Image>
              </View>
            </Modal>
            <View style={styles.container}>{imgs}</View>

            <SpeedDial
              style={{marginBottom: 20, borderRadius: 50}}
              color="red"
              isOpen={open}
              icon={<Icon name="plus" size={20} color={'white'} />}
              openIcon={<Icon name="minus" size={20} color={'white'} />}
              onOpen={() => setOpen(!open)}
              onClose={() => setOpen(!open)}>
              <SpeedDial.Action
                icon={<Icon name="trash" size={20} color={'white'} />}
                title="Borrar Fotos"
                onPress={() => console.log('Delete Something')}
                color="red"
              />
              <SpeedDial.Action
                icon={<Icon name="upload" size={20} color={'white'} />}
                title="Agregar a Tienda"
                onPress={() => subirImagenesSeleccionadas()}
                color="red"
              />
            </SpeedDial>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee',
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',
  },
  text: {
    color: '#fff',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
});

const mapStateToProps = state => ({
  detalles: state.detalles,
  camara: state.camara,
});

export default connect(mapStateToProps, {setNumeroFotos})(Galeria);
