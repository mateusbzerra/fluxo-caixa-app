import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function verifyToken() {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (token) {
        navigation.navigate('List');
      }
    }
    verifyToken();
  }, []);

  async function handleSubmit() {
    if (cpf.length > 12 && password) {
      const response = await api.post('/login', { cpf, password });
      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('List');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image}></Image>
      <View style={styles.form}>
        <Text style={styles.label}>CPF</Text>
        <TextInput
          value={cpf}
          onChangeText={setCpf}
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Informe o CPF"
        ></TextInput>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          secureTextEntry
          placeholder="Informe a senha"
        ></TextInput>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15
  },
  image: {
    width: 200,
    height: 200
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },
  title: {
    color: '#E20C14',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 30
  },
  button: {
    height: 42,
    backgroundColor: '#E20C14',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
