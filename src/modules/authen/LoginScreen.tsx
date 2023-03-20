import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FormTextInput from '~components/text-field/FormTextInput';
import {systemColors} from '~constans/system-colors';
import {FONTS} from '~constans/system-fonts';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text1 from '~components/loading/text/text-1/Text1';
import {useMutation} from '@tanstack/react-query';
import {localServices} from '~services/local-service';
import {authenticateService} from '~services/api';
import handleApiError from '~services/api/handle-api_error';
import Loading from '~components/loading/Loading';
import {navigationServices} from '~navigation/navigation-services';
import CountDown from '~components/count-down/CountDown';

type FormValues = {
  username: string;
  password: string;
};
const LoginScreen = () => {
  const inset = useSafeAreaInsets();
  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      // .email('Please enter valid email')
      // .matches(/^\d+$/, {message: 'is format email'})
      .required('Username is Required'),
    password: yup
      .string()
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  const passRef = useRef<any>(null);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {username: '', password: ''},
    mode: 'onSubmit',
    resolver: yupResolver(loginValidationSchema),
  });
  const handleLoginApi = async (data: FormValues) => {
    try {
      const res = await authenticateService.login_api(data);
      return res?.data?.data;
    } catch (error) {
      handleApiError(error);
    }
  };
  const {mutate, isLoading, isSuccess} = useMutation({
    mutationFn: handleLoginApi,
    async onSuccess(data, variables, context) {
      console.log('data', data);
      await localServices.saveToken(data);
      await authenticateService.verify();
      navigationServices.replace('HomeStackApp');
    },
    onError(err) {
      console.log('eerrrrr query', errors);
    },
  });

  // const viewModel = useViewModel(AuthenModel);

  // const onSubmit = () => {
  //   console.log('onSubmit', errors);
  //   console.log(getValues());
  // };
  const userRef = useRef<any>(null);
  const [a, setA] = useState<number>(0);
  const onSubmit = (data: any) => {
    // mutate(data);
    // setA(a + 1);
    // passRef?.current?.focus();
  };

  const onClick = () => {
    setA(a + 1);
  };
  // const onError: NewType = (errors, e) => {
  //   return console.log(errors);
  // };

  useEffect(() => {
    console.log('useEffect cha', a);
    // return () => {
    //   console.log('return 1 time', a);
    // };
  }, []);

  return (
    <>
      {console.log('Re - render Cha ne', a)}
      <View style={[styles.container, {marginBottom: inset.bottom || 0}]}>
        <View style={styles.body}>
          <Text1 fontType={2} regular style={styles.txtTitle}>
            Username a{a}
          </Text1>

          <FormTextInput
            ref={userRef}
            control={control}
            customContainerView={styles.containerInputField}
            name="username"
            returnKeyType="next"
            // rules={{require: true}}
            placeholder="Please enter your username!"
            errorMessage={errors?.username?.message!}
            onSubmitEditing={() => passRef?.current?.focus()}
          />

          <Text1 fontType={2} regular style={styles.txtTitle}>
            Password
          </Text1>
          <FormTextInput
            ref={passRef}
            control={control}
            customContainerView={styles.containerInputField}
            name="password"
            returnKeyType="done"
            // rules={{require: true}}
            placeholder="Please enter your password!"
            secureTextEntry
            errorMessage={errors?.password?.message!}
            onSubmitEditing={() => userRef?.current?.focus()}
          />

          <TouchableOpacity
            onPress={
              // handleSubmit(onSubmit)
              () => onClick()
              // viewModel.handleLogin();
            }
            style={styles.btnLogin}>
            <Text style={styles.txtSubmit}>Login</Text>
          </TouchableOpacity>
        </View>
        <CountDown value={a} />
        <Loading isVisible={isLoading} />
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: systemColors.white,
  },
  body: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  containerInputField: {
    backgroundColor: systemColors.halfGrey,
    //marginBottom: 15,
  },
  txtSubmit: {
    fontSize: 25,
    color: systemColors.white,
    fontFamily: FONTS.RobotoItalic,
  },
  txtTitle: {
    fontSize: 20,
    lineHeight: 38,
    color: systemColors.Grey04,
  },
});
