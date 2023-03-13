import {observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {SubmitErrorHandler, useForm, useController} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormTextInput from '~components/text-field/FormTextInput';
import {systemColors} from '~constans/system-colors';
import {FONTS} from '~constans/system-fonts';
import {useViewModel} from '~utils/hook';
import {AuthenModel} from './authen-model';

type FormValues = {
  username: string;
  password: string;
};
const LoginScreen = () => {
  const passRef = useRef<any>();
  // const viewModel = useViewModel(AuthenModel);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: {errors},
  } = useForm();
  // const onSubmit = () => {
  //   console.log('onSubmit', errors);
  //   console.log(getValues());
  // };
  const onSubmit = (data: any) => console.log(data, errors);

  // const onError: NewType = (errors, e) => {
  //   return console.log(errors);
  // };

  return (
    <View style={styles.container}>
      {/* <TextField
        customContainerView={styles.containerInputField}
        placeholder="Username"
        returnKeyType="next"
        onChangeText={viewModel.setUsername}
        autoFocus
        textError={viewModel.msgValidateEmail}
        onSubmitEditing={() => {
          viewModel.onSubmitEmail(passRef);
        }}
      /> */}

      {/* <TextField
        customContainerView={styles.containerInputField}
        ref={passRef}
        placeholder="Password"
        returnKeyType="done"
        secureTextEntry
        value={viewModel.password}
        onChangeText={viewModel.setPassword}
      /> */}

      <Text>user name</Text>

      <FormTextInput
        // style={styles.containerInputField}
        control={control}
        name="username"
        rules={{require: true}}
        placeholder="Please enter your username!"
        errorMessage="This field is required Username!"
      />

      <Text>password</Text>

      {/* <FormTextInput
        control={control}
        name="password"
        rules={{require: true}}
        placeholder="Please enter your password!"
        errorMessage="This field is required Password!"
      /> */}

      <TouchableOpacity
        onPress={
          handleSubmit(onSubmit)
          // viewModel.handleLogin();
        }
        style={styles.btnLogin}>
        <Text style={styles.txtSubmit}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default // observer(
LoginScreen;
// );

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
