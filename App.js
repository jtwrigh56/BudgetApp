import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './app/HomeScreen';
import BudgetScreen from './app/BudgetScreen';
import SpendingScreen from './app/SpendingScreen';
import {createStackNavigator} from '@react-navigation/stack';
import IncomeScreen from './app/IncomeScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Menu'}} />
        <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
        <Stack.Screen name="SpendingScreen" component={SpendingScreen} />
        <Stack.Screen name="IncomeScreen" component={IncomeScreen} />
      </Stack.Navigator>
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
