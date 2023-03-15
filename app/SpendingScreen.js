import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const SpendingScreen = () => {
    const [budget, setBudget] = useState(0);
    const [billName, setBillName] = useState(0);
    const [weeklyBudget, setWeeklyBudget] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);

    const addBudget = () => {
        setWeeklyBudget([...weeklyBudget, {name: billName, amount: budget, date: moment().format('DD/MM/YYYY') }]);
        setTotalBudget(totalBudget + parseInt(budget));
        setBudget(0);
        setBillName(0);
      };
      useEffect(() => {
        loadData();
      }, []);

      const loadData = async () => {
        try {
            const data = await AsyncStorage.getItem('myBudget');
            if(data) {
                const {totalBudget} = JSON.parse(data);
                setBudget(budget);
                setBillName(billName);
                setWeeklyBudget(weeklyBudget);
                setTotalBudget(totalBudget);
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
      }
      const saveData = async () =>{
        try {
            await AsyncStorage.setItem('mySpending', JSON.stringify({budget, billName, weeklyBudget, totalBudget}));
        } catch (e){
            alert('Error Saving Data');
            console.error('Error Saving Data', e);
        }
      }

      async function clearStorage() {
        try {
          await AsyncStorage.clear();
        } catch(e) {
          console.error(`Error Clearing local Storage: ${e}`)
        }
      }
    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Spending</Text>
        <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Enter Bill Name"
            value={billName}
            onChangeText={(value) => setBillName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={budget}
            onChangeText={(value) => setBudget(value)}
          />
          <Button
            icon={() => <Icon name="plus-circle-outline" size={30} />}
            mode="contained"
            onPress={addBudget}
          >
            Add
          </Button>
          <Button
            icon={() => <Icon name="plus-circle-outline" size={30} />}
            mode="contained"
            onPress={saveData}
          >
            Save
          </Button>
          <Button
            icon={() => <Icon name="plus-circle-outline" size={30} />}
            mode="contained"
            onPress={clearStorage}
          >
            Clear
          </Button>
        </View>
        <View style={styles.budgetContainer}>
        {weeklyBudget.map((item, index) => (
            <View style={styles.budgetItem} key={index}>
              <Text style={styles.budgetAmount}>{item.name}</Text>
              <Text style={styles.budgetAmount}>${item.amount}</Text>
              <Text style={styles.budgetDate}>{item.date}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottom}>
            <Text style={styles.totalBudget}>Total Spent: ${totalBudget}</Text>
        </View>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
  
    bottom:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 36
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#000',
      padding: 10,
      marginRight: 10,
      fontSize: 18,
    },
    budgetContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    budgetItem: {
      borderWidth: 1,
      borderColor: '#000',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '48%',
    },
    budgetAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    budgetDate: {
      fontSize: 14,
      color: '#777',
    },
    totalBudget: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    totalSpent: {
      paddingTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
    }
  });

export default SpendingScreen;