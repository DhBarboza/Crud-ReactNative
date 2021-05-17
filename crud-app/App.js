import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ItemsList from './screens/ItemsList';
import CreateItem from './screens/CreateItem';
import ItemDetail from './screens/ItemDetail';

const Stack = createStackNavigator();

function MyStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItemsList" component={ItemsList} options={{title: 'Anotações'}}/>
      <Stack.Screen name="CreateItem" component={CreateItem} options={{title: 'Nova Anotação'}}/>
      <Stack.Screen name="ItemDetail" component={ItemDetail} options={{title: 'Detalhes'}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
