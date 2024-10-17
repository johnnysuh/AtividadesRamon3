import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function AddMemoryScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const addMemory = async () => {
    const newMemory = { title, date, location, description, image };
    const storedMemories = await AsyncStorage.getItem('memories');
    const memories = storedMemories ? JSON.parse(storedMemories) : [];
    memories.push(newMemory);
    await AsyncStorage.setItem('memories', JSON.stringify(memories));
    navigation.goBack();
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Quando aconteceu? (Ano)" value={date} onChangeText={setDate} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Onde aconteceu? (Cidade)" value={location} onChangeText={setLocation} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Conte sobre sua memória" value={description} onChangeText={setDescription} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TouchableOpacity onPress={selectImage}>
        <Text>Selecionar foto da galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto}>
        <Text>Tirar foto agora</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 }} />}
      <Button title="Adicionar" onPress={addMemory} />
    </View>
  );
}