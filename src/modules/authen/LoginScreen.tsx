import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextField from '~components/text-field/TextField';
import {navigationServices} from '~navigation/navigation-services';
import {validateEmail} from '~utils';
import {systemColors} from '../../constans/system-colors';

const LoginScreen = () => {
  const passRef = useRef<any>();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const msgValidateEmail = useRef<string>('');

  const onSubmitEmail = () => {
    validateEmail(userName)
      ? (msgValidateEmail.current = '')
      : (msgValidateEmail.current = 'format email not valid');
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <TextField
        customContainerView={styles.containerInputField}
        placeholder="Username"
        returnKeyType="next"
        onChangeText={value => setUserName(value)}
        autoFocus
        textError={msgValidateEmail.current}
        onSubmitEditing={() => {
          onSubmitEmail();
          passRef.current?.focus();
        }}
      />
      <TextField
        customContainerView={styles.containerInputField}
        ref={passRef}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry
        value={password}
        onChangeText={value => setPassword(value)}
      />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: systemColors.darkGray,
    paddingHorizontal: 20,
  },
  btnLogin: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  containerInputField: {
    backgroundColor: systemColors.halfGrey,
    marginBottom: 15,
  },
});
