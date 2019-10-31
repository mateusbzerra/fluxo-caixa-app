import React, { useEffect } from 'react';
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

// import { Container } from './styles';

function Add({ values, handleSubmit, errors, setFieldValue }) {
  return (
    <View style={styles.container}>
      <Header></Header>
      <View>
        <View>
          <Text>Receita</Text>
          <Switch
            value={values.incoming}
            onValueChange={value => setFieldValue('incoming', value)}
          ></Switch>
        </View>
        <TextInput
          style={styles.input}
          value={values.value}
          onChangeText={text => setFieldValue('value', text)}
          placeholder="Valor"
        ></TextInput>
        {errors.value && <Text>{errors.value}</Text>}
        <TextInput
          style={styles.input}
          value={values.description}
          onChangeText={text => setFieldValue('description', text)}
          placeholder="Descrição"
        ></TextInput>
        {errors.description && <Text>{errors.description}</Text>}

        <TextInput
          style={styles.input}
          value={values.date}
          onChangeText={text => setFieldValue('date', text)}
          placeholder="Data"
        ></TextInput>
        {errors.date && <Text>{errors.date}</Text>}

        <TextInput
          style={styles.input}
          value={values.type}
          onChangeText={text => setFieldValue('type', text)}
          placeholder="Tipo"
        ></TextInput>
        {errors.type && <Text>{errors.type}</Text>}

        <TouchableOpacity onPress={handleSubmit}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    type: Yup.string().required('Informe o tipo')
  }),
  validateOnChange: false,

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
  }
})(Add);
