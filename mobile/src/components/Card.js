import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
// import { Container } from './styles';

export default function Card({ data }) {
  function formatDate(date) {
    return moment.utc(date).format('DD/MM');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(data.date)}</Text>
      <View style={styles.rightContent}>
        <View>
          <View style={styles.content}>
            <Text numberOfLines={2} style={styles.description}>
              {data.description}
            </Text>
            <Text style={[styles.value, data.incoming && styles.greenColor]}>
              {data.formated_value}
            </Text>
          </View>
        </View>

        <View style={styles.typeContainer}>
          {data.type === 2 || data.type === 3 ? (
            <Icon name="credit-card" color="#555" size={15}></Icon>
          ) : (
            data.type === 1 && <Icon name="money" color="#555" size={15}></Icon>
          )}
          <Text style={styles.type}>{data.type_name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  greenColor: {
    color: '#3CB371'
  },
  value: {
    color: '#f66',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    color: '#222'
  },
  rightContent: {
    flex: 1,
    flexDirection: 'column',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#888',
    paddingLeft: 10
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    paddingRight: 10
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },
  type: {
    color: '#555',
    fontSize: 12,
    marginLeft: 5
  }
});
