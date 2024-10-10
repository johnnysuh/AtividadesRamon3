import { useState, useRef } from 'react'
import { View, StyleSheet, Text, Image, Button, Pressable, ImageBackground } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import * as Linking from 'expo-linking'

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
  

  const trocarCamera = () => {
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
            <Image style={{ height: 90, width: 90 }} source={{ uri: 'https://static.thenounproject.com/png/390423-200.png' }}></Image>
          </Pressable>
          <Pressable onPress={salvarFoto}>
            <Image style={{ height: 50, width: 50 }} source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/icon-pack/download-347.png' }}></Image>
          </Pressable>
        </View>
      </ImageBackground>

      :
      <CameraView facing={lado} style={styles.camera} ref={cameraRef} onBarcodeScanned={(data) => { qrCodeHandle(data) }} barcodeScannerSettings={{ barcodeTypes: ["qr"] }}>
      <Pressable style={styles.shutterButton} onPress={tirarFoto}>
          <Image style={{ height: 120, width: 120 }} source={{ uri: 'https://static.thenounproject.com/png/120101-200.png' }}></Image>
      </Pressable>

      <Pressable style={styles.rotateButton} onPress={trocarCamera}>
          <Image style={{ height: 50, width: 50 }} source={{ uri: 'https://cdn-icons-png.freepik.com/256/15014/15014390.png?semt=ais_hybrid' }}></Image>
      </Pressable>

  </CameraView>
  }
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  textoPermissao:{
    textAlign: 'center'
  },
  camera:{
    flex: 1
  },
  foto:{
    width: '100%',
    height: '100%',
    flex: 1
  },
  shutterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: "95%",
    justifyContent: 'center',
    width: 120,
    alignSelf: 'center',
  },
  rotateButton: {
    top: -690,
    left: 20,
    width: 50,
  },
  postPicActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    left: -10,
    height: "180%"
}
})