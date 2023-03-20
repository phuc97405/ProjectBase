import {NavigatorScreenParams} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
export const RootStack = createNativeStackNavigator<RootStackParamList>();
export const RootStackScreen = createNativeStackNavigator<HomeAppParamList>();

type HomeAppParamList = {
  Home: undefined;
};

export type HomeAppStackScreenProps<T extends keyof HomeAppParamList> =
  NativeStackScreenProps<HomeAppParamList, T>;

export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeStackApp: NavigatorScreenParams<HomeAppParamList>;
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
