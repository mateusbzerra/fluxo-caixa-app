import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  DatePickerAndroid,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import SelectModal from '../components/SelectModal';
import api from '../services/api';
import moment from 'moment';

// import { Container } from './styles';

function Add({ values, handleSubmit, errors, setFieldValue, isSubmitting }) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  function handleClose(modalVisible, type) {
    setVisible(modalVisible);
    setFieldValue('type', type);
  }
  function formatInput(atualValue, value, mascara) {
    if (atualValue.length < value.length) {
      const i = value.length;
      let saida = mascara.substring(0, 1);
      let texto = mascara.substring(i);
      if (texto.substring(0, 1) !== saida) {
        value += texto.substring(0, 1);
      }
    }
    return String(value);
  }

  const operations = [
    '',
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Operacional',
    'Mercadoria',
    'Funcionário'
  ];

  async function openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setFieldValue('date', new Date(year, month, day).toISOString());
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        color="rgba(226,12,20,.4)"
      ></StatusBar>
      <Header></Header>
      <View style={styles.content}>
        <View style={styles.switchView}>
          <Text style={styles.label}>Receita</Text>
          <Switch
            value={values.incoming}
            onValueChange={value => setFieldValue('incoming', value)}
          ></Switch>
        </View>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          value={values.value}
          keyboardType="numeric"
          onChangeText={text => setFieldValue('value', text)}
          placeholder="Valor"
        ></TextInput>
        {errors.value && <Text style={styles.errorText}>{errors.value}</Text>}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={values.description}
          onChangeText={text => setFieldValue('description', text)}
          placeholder="Descrição"
        ></TextInput>
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
        <Text style={styles.label}>Data</Text>

        <TouchableOpacity style={styles.input} onPress={openDatePicker}>
          <Text style={styles.typeText}>
            {values.date ? values.date : 'Data'}
          </Text>
        </TouchableOpacity>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        <Text style={styles.label}>Tipo</Text>
        <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
          <Text style={styles.typeText}>
            {values.type ? operations[values.type] : 'Tipo'}
          </Text>
        </TouchableOpacity>
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
        {isSubmitting ? (
          <ActivityIndicator color="#222" size="large" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        )}
        {errors.submitMessage && (
          <Text style={styles.errorText}>{errors.submitMessage}</Text>
        )}

        <SelectModal handleClose={handleClose} visible={visible}></SelectModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginHorizontal: 15,
    paddingVertical: 10
  },
  switchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5
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
    borderRadius: 30,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  button: {
    height: 42,
    backgroundColor: '#3CB371',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  typeText: {
    fontSize: 16,
    color: '#ccc'
  },
  errorText: {
    color: '#f66',
    textAlign: 'center'
  }
});

export default withFormik({
  mapPropsToValues: () => ({
    incoming: false,
    value: '',
    description: '',
    date: '',
    type: ''
  }),

  validationSchema: Yup.object().shape({
    incoming: Yup.boolean(),
    value: Yup.string().required('Informe o valor'),
    description: Yup.string().required('Informe uma descrição'),
    date: Yup.string().required('Informe a data'),
    type: Yup.number().required('Informe o tipo')
  }),
  validateOnChange: false,

  handleSubmit: async (values, { resetForm, setErrors, props }) => {
    const data = {
      incoming: values.incoming,
      value: values.value,
      description: values.description,
      date: moment(values.date).format('YYYY-MM-DD'),
      type: values.type
    };

    try {
      const response = await api.post('operations', data);
      resetForm({});
      props.navigation.navigate('List');
    } catch (err) {
      setSubmitting(false);
      setErrors({ message: 'Erro ao cadastrar operação' });
    }
  }
})(Add);
