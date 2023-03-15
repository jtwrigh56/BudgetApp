import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, TabActions, useNavigation } from '@react-navigation/native';
import BudgetScreen from './BudgetScreen';
import SpendingScreen from './SpendingScreen';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function HomeScreen() {
    const navigation = useNavigation();
    const [totalBudget, setTotalBudget] = useState(0);
    useEffect(() => {
        loadData();
      }, []);

      const loadData = async ()  => {
        try {
            const data = await AsyncStorage.getItem('myBudget');
            if(data) {
                const { totalBudget} = JSON.parse(data);
                //setBudget(budget);
                //setBillName(billName);
                //setWeeklyBudget(weeklyBudget);

                setTotalBudget(totalBudget);
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
      }

    return (
        <View>
            <View style={styles.buttonContainer}>
                <Button style={styles.buttonStyle} icon={() => <Icon name="cash-multiple" size={75} />}
                    mode="elevated" buttonColor='#c9c936' labelStyle={styles.label}   onPress={() => navigation.navigate('SpendingScreen')}>
                    Spending
                </Button>
            <Button 
                style={styles.buttonStyle} icon={() => <Icon name="bank" size={75} />}
                mode="elevated" buttonColor='#36C9C9' labelStyle={styles.label}
                onPress={() => navigation.navigate('IncomeScreen')}>
                Income
                </Button>
            </View>
            <Text>{totalBudget}</Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    buttonStyle: {
        justifyContent: 'center',
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
    label: {
        fontSize: 18,
    }
})