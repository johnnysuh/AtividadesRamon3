import { useState, useRef } from 'react'
import { View, StyleSheet, Text, Image, Button, Pressable, ImageBackground } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

export default function Camera() {
  const [permissao, pedirPermissao] = useCameraPermissions()
  const [foto, setFoto] = useState(null)
  const cameraRef = useRef(null)
  const [lado, setLado] = useState('back')

  const qrCodeHandle = (data) => {
    let value = data.data
    Linking.openURL(value).catch(() => {console.log("Não foi possível abrir")})
}

  const tirarFoto = async () => {
    const foto_base64 = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      base64: true
    })
    setFoto(foto_base64)
  }
  

  const trocaCamera = () => {
    setLado(lado == 'back' ? 'front' : 'back')
  }

  if (!permissao){
    return (
      <View></View>
    )
  }

  if (!permissao.granted){
      return(
        <View style={styles.container}>
          <Text style={styles.textoPermissao}>Você precisa pedir a permissão para usar a câmera</Text>
          <Button title='Pedir Permissão' onPress={pedirPermissao}/>
        </View>
      )
  }

  const salvarFoto = () => {
      MediaLibrary.saveToLibraryAsync(foto.uri)
      setFoto(null)
  }



  return (
    <View style={styles.container}>
    {foto ?
      <ImageBackground source={{ uri: foto.uri }} resizeMode="cover" style={styles.foto}>
        <View style={styles.postPicActions}>
          <Pressable onPress={() => { setFoto(null) }}>
            <Image style={{ height: 90, width: 90 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2067/2067754.png' }}></Image>
          </Pressable>
          <Pressable onPress={salvarFoto}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: 'https://static-00.iconduck.com/assets.00/save-icon-2048x2048-iovw4qr4.png' }}></Image>
          </Pressable>
        </View>
      </ImageBackground>

                :
      <View>
        <Image source={{uri: foto.uri}} style={styles.foto}></Image>
        <Button title='Descartar foto' onPress={() => setFoto(null)}/>
        <Button title='Salvar foto' onPress={salvarFoto}/>
      </View> :
    <CameraView facing={'back'} style={styles.camera} ref={cameraRef}>
      <Button title='Tirar foto' onPress={tirarFoto}/>
      <Button title='inverter camera' onPress={trocaCamera}/>
    </CameraView>
  }
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center'
  },
  textoPermissao:{
    textAlign: 'center'
  },
  camera:{
    flex: 1
  },
  foto:{
    width: '100%',
    height: '100%'
  }
})