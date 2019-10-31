import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch
} from 'react-native';
import Header from '../components/Header';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import SelectModal from '../components/SelectModal';

// import { Container } from './styles';

function Add({ values, handleSubmit, errors, setFieldValue }) {
  const [visible, setVisible] = useState(false);
  function handleClose(modalVisible, type) {
    setVisible(modalVisible);
    setFieldValue('type', type);
  }
  return (
    <View style={styles.container}>
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
          onChangeText={text => setFieldValue('value', text)}
          placeholder="Valor"
        ></TextInput>
        {errors.value && <Text>{errors.value}</Text>}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={values.description}
          onChangeText={text => setFieldValue('description', text)}
          placeholder="Descrição"
        ></TextInput>
        {errors.description && <Text>{errors.description}</Text>}
        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          value={values.date}
          onChangeText={text => setFieldValue('date', text)}
          placeholder="Data"
        ></TextInput>
        {errors.date && <Text>{errors.date}</Text>}
        <Text style={styles.label}>Tipo</Text>

        {/* <TextInput
          style={styles.input}
          value={values.type}
          onChangeText={text => setFieldValue('type', text)}
          placeholder="Tipo"
        ></TextInput> */}
        <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
          <Text style={styles.typeText}>Tipo</Text>
        </TouchableOpacity>
        {errors.type && <Text>{errors.type}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
  }
});

export default withFormik({
  mapPropsToValues: () => ({
    incoming: '',
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

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  }
})(Add);
