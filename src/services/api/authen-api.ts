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
  verify = async () => {
    const res = await BaseAPI.post(AUTHEN_URL.verify, {
      verificationCode: '123456',
    });
  };
  testQuery = async (idCoin?: string, page: number = 1, limit: number = 10) => {
    const res = await BaseAPI.get(
      `${AUTHEN_URL.testQuery}${idCoin}?page=${page}&limit=${limit}`,
    );
    return res;
  };
}

export {Authenticate};
