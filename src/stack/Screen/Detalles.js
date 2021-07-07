import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button, Text, Icon, Input, FAB} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import AnimatedLoader from 'react-native-animated-loader';
import SweetAlert from 'react-native-sweet-alert';
import {
  setClave,
  setComentario,
  enviarInformacion,
  getFecha,
  getHora,
  prepareDetails,
  setDetailsReady,
  setInformacionEnviada,
} from '../../redux/actions/detallesActions';
import {getLocation, setHasLocation} from '../../redux/actions/locationActions';
import {setNumeroFotos} from '../../redux/actions/camaraActions';
import {connect} from 'react-redux';

const Detalles = ({
  navigation,
  detalles: {
    clave,
    comentario,
    informacionEnviada,
    details,
    detailsReady,
    imagenesSeleccionadas,
  },
  tiendas: {currentStore},
  camara: {numeroDeFotos, imagenes},
  camps: {currentCamp},
  location: {location},
  setClave,
  setComentario,
  enviarInformacion,
  prepareDetails,
  setDetailsReady,
  setInformacionEnviada,
  setNumeroFotos,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editarComentario, setEditarComentario] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [usaImgsSeleccionadas, setUsaImgsSeleccionadas] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    }
  }, [loading]);

  useEffect(() => {
    if (clave === '1') {
      setEditarComentario(false);
      setComentario('PUBLICIDAD INSTALADA CON FOTO');
    } else {
      setEditarComentario(true);
    }
  }, [clave]);

  useEffect(() => {
    if (detailsReady) {
      enviarInformacion(
        imgs,
        currentCamp.info_id,
        currentCamp.concepto,
        currentStore.id,
        details,
        clave,
        comentario,
      );
      setDetailsReady(false);
    }
  }, [detailsReady]);

  useEffect(() => {
    if (informacionEnviada) {
      setLoading(false);
      SweetAlert.showAlertWithOptions(
        {
          title: 'Se han mandado las evidencias',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: false,
        },
        () => {
          navigation.navigate('Galeria');
          setInformacionEnviada(false);
        },
      );
    } else {
      setLoading(false);
    }
  }, [informacionEnviada]);

  useEffect(() => {
    if (imagenesSeleccionadas.length > 0) {
      //AQUI DEBE ESTAR EL BUG DEL PORQUE NO SE CONTABILIZAN LAS FOTOS.
      console.log('USA LAS IMAGENES SELECCIONADAS');
      setImgs(imagenesSeleccionadas);
    } else {
      console.log('USA EL ARREGLO DE IMAGENES');
      setImgs(imagenes);
    }
  }, [imagenes, imagenesSeleccionadas]);

  const subirEvidencias = () => {
    setLoading(true);
    console.log(imgs);

    if (clave === '') {
      SweetAlert.showAlertWithOptions({
        title: 'Sin clave',
        subTitle: `Debes seleccionar una clave.`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'warning',
        cancellable: true,
      });
      setLoading(false);
    } else if (comentario === '') {
      SweetAlert.showAlertWithOptions({
        title: 'Sin comentario',
        subTitle: 'Escribe un comentario.',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'warning',
        cancellable: true,
      });
      setLoading(false);
    } else if (imgs.length === 0) {
      SweetAlert.showAlertWithOptions({
        title: 'No hay fotos',
        subTitle: 'No se han tomado fotos.',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'warning',
        cancellable: true,
      });
      setLoading(false);
    } else {
      prepareDetails(imgs, location);
    }
  };

  const pickerRef = useRef();

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {loading ? (
            <AnimatedLoader
              visible={visible}
              overlayColor="rgba(255,255,255,0.75)"
              source={require('../../../assets/loading.json')}
              animationStyle={styles.lottie}
              speed={1}></AnimatedLoader>
          ) : null}

          <FAB
            icon={
              <Icon
                name="home"
                size={20}
                color={'white'}
                style={{margin: 15}}
                onPress={() => navigation.navigate('Tiendas')}
              />
            }
            size="small"
            color={'#F9362C'}
            style={{marginTop: 15}}
            onPress={() => navigation.navigate('Tiendas')}
          />

          <Card>
            <Card.Title h4 style={{color: 'red'}}>
              Tienda:
            </Card.Title>
            <Text h4 style={{marginLeft: 20, marginBottom: 10}}>
              {' '}
              {currentStore.tienda_nombre} - {currentStore.cadena_nombre}
            </Text>
            <Card.Divider />
            <Card.Title h4 style={{color: 'red'}}>
              Campaña:
            </Card.Title>
            <Text h4 style={{marginLeft: 20}}>
              {' '}
              {currentCamp.camp_nombre} - {currentCamp.concepto}
            </Text>
          </Card>

          <Card>
            <Text h4>Clave</Text>
            <Picker
              ref={pickerRef}
              selectedValue={clave}
              onValueChange={(itemValue, itemIndex) => setClave(itemValue)}>
              <Picker.Item label="" value="0" />
              <Picker.Item label="PUBLICIDAD INSTALADA CON FOTO" value="1" />
              <Picker.Item label="NO HAY PRODUCTO" value="2" />
              <Picker.Item label="NO HAY MATERIAL" value="3" />
              <Picker.Item label="NO HAY MATERIAL DE REPOSICION" value="4" />
              <Picker.Item label="NO HAY ESPACIO" value="5" />
              <Picker.Item label="NO AUTORIZO" value="6" />
              <Picker.Item label="TIENDA EN CAMBIO DE CUADRAJE" value="7" />
              <Picker.Item label="NO HAY CONTRATO CON CLIENTE" value="8" />
              <Picker.Item label="NO HAY CORREO EN TIENDA" value="9" />
              <Picker.Item label="INSTALADA NO AUTORIZARON FOTO" value="10" />
              <Picker.Item label="NO HAY CABECERA" value="11" />
              <Picker.Item label="NO HAY ISLA" value="12" />
              <Picker.Item label="POCO PRODUCTO" value="13" />
              <Picker.Item label="TIENDA EN REMODELACIÓN" value="14" />
              <Picker.Item label="TIENDA RETIRO PUBLICIDAD" value="15" />
              <Picker.Item label="TIENDA EN INVENTARIO" value="16" />
              <Picker.Item label="REINSTALACIÓN DE MATERIAL" value="17" />
              <Picker.Item label="REPOSICIÓN DE MATERIAL" value="18" />
              <Picker.Item label="TIENDA CON VISITA DISTRITAL" value="19" />
              <Picker.Item label="TIENDA CERRADA" value="20" />
              <Picker.Item label="COMPROBACION DE RETIRO" value="21" />
              <Picker.Item label="EVENTUALIDAD" value="22" />
              <Picker.Item
                label="TIENDA RETIRÓ MATERIAL POR FALTA DE PRODUCTO"
                value="23"
              />
              <Picker.Item
                label="TIENDA RETIRO MATERIAL POR INDICACIONES DE GERENCIA"
                value="24"
              />
              <Picker.Item
                label="TIENDA NO AUTORIZA POR FALTA DE PRODUCTO"
                value="25"
              />
              <Picker.Item
                label="TIENDA NO AUTORIZA POR INDICACIONES DE GERENCIA"
                value="26"
              />
              <Picker.Item label="NO HAY EXHIBICION ARMADA" value="27" />
            </Picker>

            <Text h4>
              Comentario
              <Icon
                name="comment"
                type="font-awesome"
                size={15}
                color="black"
                style={{marginLeft: 10}}
              />
            </Text>
            <Input
              placeholder="..."
              onChangeText={value => setComentario(value)}
              editable={editarComentario}
            />

            <Text h4>Numero de fotos: {imagenes.length}</Text>

            <Card.Divider />

            <Button
              icon={
                <Icon
                  name="camera"
                  type="font-awesome"
                  size={17}
                  color="black"
                  style={{marginLeft: 10}}
                />
              }
              title="Tomar Foto"
              onPress={() => navigation.navigate('CamDetalles')}
            />

            <Button
              buttonStyle={{backgroundColor: 'green', marginTop: 5}}
              icon={
                <Icon
                  name="upload"
                  type="font-awesome"
                  size={17}
                  color="black"
                />
              }
              title="Subir Evidencias"
              style={{padding: 10}}
              onPress={() => subirEvidencias()}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    justifyContent: 'center',
    width: 500,
    height: 500,
  },
});

const mapStateToProps = state => ({
  detalles: state.detalles,
  tiendas: state.tiendas,
  camara: state.camara,
  camps: state.camps,
  location: state.location,
});

export default connect(mapStateToProps, {
  setClave,
  setComentario,
  enviarInformacion,
  getFecha,
  getHora,
  getLocation,
  setHasLocation,
  prepareDetails,
  setDetailsReady,
  setInformacionEnviada,
  setNumeroFotos,
})(Detalles);
