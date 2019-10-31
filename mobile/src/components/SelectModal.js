import React from 'react';
import {
  Modal,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

// import { Container } from './styles';

export default function SelectModal({ handleClose, visible }) {
  function handleType(type) {
    handleClose(!visible, type);
  }
  const operations = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Operacional',
    'Mercadoria',
    'Funcionário'
  ];
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
        <Text style={styles.title}>Tipo da Operação</Text>
        <View style={styles.content}>
          {operations.map((operation, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemButton}
              onPress={() => handleType(index + 1)}
            >
              <Text style={styles.itemText}>{operation}</Text>
            </TouchableOpacity>
          ))}
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
    justifyContent: 'center'
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
  }
});
