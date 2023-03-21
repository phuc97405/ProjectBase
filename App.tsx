import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from '~modules/authen/LoginScreen';
import HomeScreen from '~modules/home/HomeScreen';
import SplashScreen from '~modules/splash/SplashScreen';
import {navigationRef} from '~navigation/navigation-services';
import {RootStack, RootStackScreen} from '~navigation/types';
import {setDefaultPropsNativeComponent} from './src/utils/system/default-styles';
import SplashScreenMD from 'react-native-splash-screen';
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

// onlineManager.setEventListener(setOnline => {
//   return NetInfo.addEventListener(state => {
//     console.log('setOnline', state.isConnected);
//     setOnline(!!state.isConnected);
//   });
// });

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    setDefaultPropsNativeComponent();
  }, []);

  const StackHomeApp = () => {
    return (
      <RootStackScreen.Navigator
        // initialRouteName="Animateded"
        screenOptions={{
          header: () => null,
        }}>
        <RootStackScreen.Screen name="Home" component={HomeScreen} />
      </RootStackScreen.Navigator>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          onReady={() => SplashScreenMD.hide()}
          ref={navigationRef}>
          <RootStack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{header: () => null}}>
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
            <RootStack.Screen name="HomeStackApp" component={StackHomeApp} />
          </RootStack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
