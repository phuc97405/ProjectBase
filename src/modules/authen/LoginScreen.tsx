import {observer} from 'mobx-react-lite';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TextField from '~components/text-field/TextField';
import {systemColors} from '~constans/system-colors';
import {FONTS} from '~constans/system-fonts';
import {useViewModel} from '~utils/hook';
import {AuthenModel} from './authen-model';

const LoginScreen = () => {
  const passRef = useRef<any>();
  const viewModel = useViewModel(AuthenModel);

  return (
    <View style={styles.container}>
      <TextField
        customContainerView={styles.containerInputField}
        placeholder="Username"
        returnKeyType="next"
        onChangeText={viewModel.setUsername}
        autoFocus
        textError={viewModel.msgValidateEmail}
        onSubmitEditing={() => {
          viewModel.onSubmitEmail(passRef);
        }}
      />
      <TextField
        customContainerView={styles.containerInputField}
        ref={passRef}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry
        value={viewModel.password}
        onChangeText={viewModel.setPassword}
      />
      <TouchableOpacity
        onPress={() => viewModel.handleLogin()}
        style={styles.btnLogin}>
        <Text style={styles.txtSubmit}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default observer(LoginScreen);

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
  txtSubmit: {
    fontSize: 25,
    color: systemColors.white,
    fontFamily: FONTS.RobotoItalic,
  },
});
