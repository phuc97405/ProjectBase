import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from '~modules/authen/LoginScreen';
import HomeScreen from '~modules/home/HomeScreen';
import {navigationRef} from '~navigation/navigation-services';
import {RootStack, RootStackScreen} from '~navigation/types';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const StackHomeApp = () => {
    return (
      <RootStackScreen.Navigator
        // initialRouteName="HomeScreen"
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
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{header: () => null}}>
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          {/* <RootStack.Screen name='RegisterScreen' component={RegisterScreen} /> */}
          <RootStack.Screen name="HomeStackApp" component={StackHomeApp} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
