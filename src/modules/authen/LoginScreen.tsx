import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigationServices} from '~navigation/navigation-services';
// import {
//   HCESession,
//   NFCTagType4NDEFContentType,
//   NFCTagType4,
// } from 'react-native-hce';

const LoginScreen = () => {
  const passRef = useRef<any>();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  let session;

  // const startSession = async () => {
  //   const tag = new NFCTagType4({
  //     type: NFCTagType4NDEFContentType.Text,
  //     content: 'Hello world',
  //     writable: false,
  //   });

  //   session = await HCESession.getInstance();
  //   session.setApplication(tag);
  //   await session.setEnabled(true);
  // };

  useEffect(() => {
    // startSession();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        onChangeText={value => setUserName(value)}
        value={userName}
        autoFocus
        onSubmitEditing={() => passRef.current?.focus()}
      />
      <TextInput
        ref={passRef}
        placeholder="Password"
        returnKeyType="done"
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
  container: {flex: 1, justifyContent: 'center'},
  btnLogin: {backgroundColor: 'green', paddingVertical: 10},
});
