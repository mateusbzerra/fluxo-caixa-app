import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Card from '../components/Card';
import api from '../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Container } from './styles';

export default function List() {
  const [operations, setOperations] = useState([]);
  const [balance, setBalance] = useState('');
  const [month, setMonth] = useState('');
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
  useEffect(() => {
    async function getOperations() {
      const response = await api.get('operations');
      const { operations: responseData, month, balance } = response.data;
      setOperations(responseData);
      setMonth(month);
      setBalance(balance);
    }
    getOperations();
  }, [operations]);

  return (
    <View>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Icon name="cog" color="#fff" size={20}></Icon>
        <Text style={styles.headerTitle}>Redes Poty</Text>
        <Icon name="plus" color="#fff" size={20}></Icon>
      </View>
      <Text style={styles.title}>Balanço Mensal - {monthNames[month]}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E20C14',
    height: 44 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
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
