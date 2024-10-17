import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const loadMemories = async () => {
      const storedMemories = await AsyncStorage.getItem('memories');
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      }
    };
    loadMemories();
  }, []);

  const renderMemory = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MemoryDetail', { memory: item })}>
      <View style={{ margin: 10 }}>
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
        <Text>{item.title}</Text>
        <Text>{item.date}</Text>
        <Text>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList 
        data={memories}
        renderItem={renderMemory}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Adicionar memória" onPress={() => navigation.navigate('AddMemory')} />
    </View>
  );
}