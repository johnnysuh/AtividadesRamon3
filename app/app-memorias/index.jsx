import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddMemoryScreen from './screens/AddMemoryScreen/AddMemoryScreen';
import MemoryDetailScreen from './screens/MemoryDetailScreen/MemoryDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Memórias' }} />
        <Stack.Screen name="AddMemory" component={AddMemoryScreen} options={{ title: 'Adicionar nova memória' }} />
        <Stack.Screen name="MemoryDetail" component={MemoryDetailScreen} options={{ title: 'Detalhes da Memória' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}