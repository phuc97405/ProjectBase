import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import splash from '~assets/splash';
import Loading from '~components/loading/Loading';
import {navigationServices} from '~navigation/navigation-services';
import handleApiError from '~services/api/handle-api_error';
import {localServices} from '~services/local-service';
import styles from './styles';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      callGetInfoUserApi();
    }, 500);
  }, []);

  const callGetInfoUserApi = async () => {
    try {
      await localServices.load();
      if (localServices.token.accessToken) {
        navigationServices.replace('HomeStackApp');
      } else {
        navigationServices.replace('LoginScreen');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={splash.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.version}>Version 11.69</Text>
      <View style={styles.titles}>
        <Text style={styles.title}>나무를 만나고</Text>
        <Text style={styles.title}>사는게</Text>
        <Text style={styles.title}>달라졌다</Text>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Image source={splash.wallet} style={styles.walletImage} />
      </View>

      <View style={styles.viewBottom}>
        <Text style={styles.bottomText}>프로그램 실행을 준비 중 입니다.</Text>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: 'center',
          }}>
          <Loading isVisible={isLoading} />
        </View>
      </View>
    </View>
  );
};
export default SplashScreen;
