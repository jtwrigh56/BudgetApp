import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const BudgetScreen = () => {
 
  const [income, setIncome] = useState(0);
  
  const [incomeName, setIncomeName] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  
  const [totalSpent, setTotalSpent] = useState(0);

  const addIncome = () => {
    setWeeklyIncome([...weeklyIncome, {name: incomeName, amount: income, date: moment().format('DD/MM/YYYY')}]);
    setTotalIncome(totalIncome + parseInt(income));
    setIncome(0);
    setIncomeName(0);
  }

//   const calculateBudget = () => {
//     const availableBudget = totalIncome - totalBudget;
//     setTotalSpent(availableBudget);
//   }


  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Income</Text> 
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          placeholder="Enter Income Name"
          value={incomeName}
          onChangeText={(value) => setIncomeName(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={income}
          onChangeText={(value) => setIncome(value)}
        />
        <Button
          icon={() => <Icon name="plus-circle-outline" size={30} />}
          mode="contained"
          onPress={addIncome}
        >
          Add
        </Button>
      </View>
      <View style={styles.budgetContainer}>
        {weeklyIncome.map((item, index) => (
          <View style={styles.budgetItem} key={index}>
            <Text style={styles.budgetAmount}>{item.name}</Text>
            <Text style={styles.budgetAmount}>${item.amount}</Text>
            <Text style={styles.budgetDate}>{item.date}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalBudget}>Total Income: ${totalIncome}</Text>
      <View style={styles.bottom}>
      <Button style={styles.caluclateButton}
          icon={() => <Icon name="plus-circle-outline" size={40} />}
          mode="contained"
          onPress={calculateBudget}
        >
          Calculate
        </Button>

      <Text style={styles.totalSpent}>Amount Left: ${totalSpent}</Text>
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

export default BudgetScreen;
