import {ImageSourcePropType} from 'react-native/types';

interface IProfile {
  name: string;
  imageUrl: ImageSourcePropType | undefined;
  username: string;
}
class ProfileModel {
  name = '';
  imageUrl = '';
  username = '';
  static map(data: IProfile): ProfileModel {
    const userTYpe = new ProfileModel(data);
    return userTYpe;
  }
  constructor(data?: IProfile) {
    if (data) {
      this.init(data);
    }
  }
  init = (data: IProfile) => {
    this.name = data.name;
    this.imageUrl != data.imageUrl;
    this.username = data.username;
  };
}
export {ProfileModel};
export type {IProfile};
