import {StyleSheet} from 'react-native';
import {systemColors} from '~constans/system-colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002c2c',
    paddingLeft: 24 + 32,
    paddingRight: 24,
    paddingVertical: 48,
  },
  logo: {
    width: 188,
    height: 35,
  },
  version: {
    color: systemColors.mainGreen,
    fontSize: 18,
    lineHeight: 28,
  },
  titles: {
    marginTop: 80,
  },
  title: {
    color: systemColors.white,
    fontSize: 56,
    lineHeight: 74,
  },
  walletImage: {
    width: 380,
    height: 520,
    marginTop: 20,
  },
  viewBottom: {
    paddingTop: 72,
    paddingBottom: 32,
    alignItems: 'center',
  },
  bottomText: {
    color: systemColors.white,
    fontSize: 21,
    lineHeight: 32,
  },
});

export default styles;
