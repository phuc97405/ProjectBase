import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {navigationServices} from '~navigation/navigation-services';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      navigationServices.replace('LoginScreen');
    }, 300);
  }, []);

  const callGetInfoUserApi = () => {
    try {
      // await local
    } catch (error) {}
  };

  return (
    <View>
      <Text>Splash screen</Text>
    </View>
  );
};
export default SplashScreen;
