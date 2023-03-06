import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {localServices} from '~services/local-service';
import {navigationServices} from '~navigation/navigation-services';
const HomeScreen = () => {
  return (
    <View>
      <Text>HomeStackApp</Text>

      <TouchableOpacity
        onPress={async () => {
          await localServices.clearToken();
          navigationServices.navigate('LoginScreen');
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
