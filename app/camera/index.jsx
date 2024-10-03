import {useState, useRef} from 'react'
import {View, StyleSheet, Text, Image, Button} from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'

export default function Camera() {
  const [permissao, pedirPermissao] = useCameraPermissions()
  const [foto, setFoto] = useState(null)
  const cameraRef = useRef(null)

  if (!permissao){
    return <View></View>
  }
  if (!permissao.granted){
      return(
        <View style={styles.container}>
          <Text style={styles.textoPermissao}>Você precisa pedir a permissão para usar a câmera</Text>
          <Button title='Pedir Permissão' onPress={pedirPermissao}/>
        </View>
      )
  }

  const tirarFoto = async () => {
    const foto = await cameraRef.current?.takePictureAsync({
      quality: 0.5,
      base64: true
    })
    setFoto(foto_base64)
  }

  return (
    <View style={styles.container}>
    {foto ? 
      <View>
        <Image source={{uri: foto.uri}} style={styles.foto}/>
      </View> :
    <CameraView facing={'back'} style={styles.camera} ref={cameraRef}>
      <Button title='Tirar foto' onPress={tirarFoto}/>
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