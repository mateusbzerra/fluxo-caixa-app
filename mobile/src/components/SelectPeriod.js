import React, { useState } from 'react';
import {
  Modal,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Picker,
  StyleSheet
} from 'react-native';

// import { Container } from './styles';
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];
const years = ['2019', '2020', '2021'];
export default function SelectModal({ handleClose, visible }) {
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Selecione o Periodo</Text>
        <View style={styles.content}>
          <View styles={styles.inputBox}>
            <Text>Mês</Text>
            <View>
              <Picker
                selectedValue={month}
                style={{ width: 120 }}
                onValueChange={(itemValue, itemIndex) => {
                  setMonth(itemValue);
                  console.log(itemValue);
                }}
              >
                {months.map((month, index) => (
                  <Picker.Item key={index} label={month} value={month} />
                ))}
              </Picker>
            </View>
          </View>
          <View styles={styles.inputBox}>
            <Text>Ano</Text>
            <View>
              <Picker
                selectedValue={year}
                style={{ width: 120 }}
                onValueChange={(itemValue, itemIndex) => {
                  setYear(itemValue);
                }}
              >
                {years.map((year, index) => (
                  <Picker.Item key={index} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('mês', month);
              handleClose(month, year);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  title: {
    color: '#222',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: -20
  },
  itemButton: {
    paddingVertical: 10
  },
  itemText: {
    color: '#222',
    fontSize: 22
  },
  button: {
    backgroundColor: '#f55',
    height: 44,
    borderRadius: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
});
