import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

// import { Container } from './styles';

function Header({ navigation, handleConfig }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleConfig}>
        <Icon name="cog" color="#fff" size={20}></Icon>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <Text style={styles.headerTitle}>Redes Poty</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <Icon name="plus" color="#fff" size={20}></Icon>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(Header);

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
  }
});
