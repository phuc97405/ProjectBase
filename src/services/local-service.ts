import AsyncStorage from '@react-native-community/async-storage';
import {IAuthenticate} from '~model/authenticate';
import {IProfile} from '~model/profile';

class LocalService {
  token: IAuthenticate = {
    accessToken: '',
    refreshToken: '',
  };

  get settingKey(): string {
    return 'sourceBase';
  }
  private save = async () => {
    let jsonString = JSON.stringify(this);
    await AsyncStorage.setItem(this.settingKey, jsonString);
  };
  public load = async () => {
    const jsonString = await AsyncStorage.getItem(this.settingKey);
    const jsonObject = jsonString ? JSON.parse(jsonString) : '';
    Object.assign(this, jsonObject);
  };
  saveToken = async (token: IAuthenticate) => {
    this.token = token;
    await this.save();
  };

  clearToken = async () => {
    this.token = {
      accessToken: '',
      refreshToken: '',
    };
    this.save();
  };

  //   profile: IProfile = {};
}

const instance = new LocalService();
export {instance as localServices};
