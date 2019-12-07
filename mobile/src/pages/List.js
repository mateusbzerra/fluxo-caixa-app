import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  AsyncStorage
} from 'react-native';
import Card from '../components/Card';
import api from '../services/api';
import Header from '../components/Header';
import SelectPeriod from '../components/SelectPeriod';

export default function List({ navigation }) {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState('');
  const [month, setMonth] = useState(Number(new Date().getMonth() + 1));
  const [year, setYear] = useState(new Date().getFullYear());
  const [visible, setVisible] = useState(false);
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  async function getOperations() {
    console.log('req', year);
    const response = await api.get(`operations?month=${month}&year=${year}`);
    console.log('response', response);
    const {
      operations: responseData,
      month: reqMonth,
      balance
    } = response.data;
    console.log('reqMonth', reqMonth);
    setOperations(responseData);
    setMonth(reqMonth);
    setBalance(balance);
  }
  useEffect(() => {
    getOperations();
  }, []);

  useEffect(() => {
    getOperations();
  }, [visible]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Header handleConfig={() => setVisible(true)}></Header>
      <Text style={styles.title}>Balanço Mensal - {monthNames[month - 1]}</Text>
      <View style={styles.balanceContainer}>
        <View style={[styles.balanceCard, styles.incoming]}>
          <Text style={styles.cardTitle}>Receitas</Text>
          <Text style={styles.incomingValue}>
            {String(`R$ ${balance.incoming / 1000}`).replace('.', ',')}
          </Text>
        </View>
        <View style={[styles.balanceCard, styles.outcoming]}>
          <Text style={styles.cardTitle}>Despesas</Text>
          <Text style={styles.outcomingValue}>
            {String(`R$ ${balance.outcoming / 1000}`).replace('.', ',')}
          </Text>
        </View>
      </View>
      <FlatList
        data={operations}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Card data={item}></Card>}
      ></FlatList>
      <SelectPeriod
        handleClose={(selectedMonth, selectedYear) => {
          console.log('selectedMonth', selectedMonth);
          setMonth(selectedMonth);
          setYear(selectedYear);
          setVisible(!visible);
          getOperations();
        }}
        visible={visible}
        handleLogout={async () => {
          await AsyncStorage.clear();
          navigation.navigate('Login');
        }}
      ></SelectPeriod>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    fontSize: 17,
    fontWeight: '300'
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  balanceCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 15,
    padding: 10,
    flex: 1,
    margin: 5
  },
  incoming: {
    borderWidth: 2,
    borderColor: '#3CB371'
  },
  outcoming: {
    borderWidth: 2,
    borderColor: '#f66'
  },
  cardTitle: {
    fontWeight: '200',
    color: '#888',
    marginBottom: 5,
    fontSize: 12
  },
  incomingValue: {
    color: '#3cb371',
    fontSize: 16,
    fontWeight: 'bold'
  },
  outcomingValue: {
    color: '#f66',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
