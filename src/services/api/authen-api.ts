import {BaseAPI} from './base-api';
import {AUTHEN_URL} from './api-url';

export type TypeLoginReq = {
  username: string;
  password: string;
};
class Authenticate {
  login_api = async (body: TypeLoginReq) => {
    const res = await BaseAPI.post(AUTHEN_URL.loginAPI, body);
    return res;
  };
}

export {Authenticate};
