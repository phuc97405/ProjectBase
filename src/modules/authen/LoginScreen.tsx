import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigationServices} from '~navigation/navigation-services';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <TouchableOpacity
        onPress={() => navigationServices.navigate('HomeStackApp')}
        style={styles.btnLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  btnLogin: {backgroundColor: 'green', paddingVertical: 10},
});
