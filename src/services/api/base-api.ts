import axios, {Method} from 'axios';
import get from 'lodash.get';
import {CONSTANTS} from '~constans/values';
import {localServices} from '~services/local-service';
import {HTTP_STATUS} from './http-status';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

export interface PropsParams {
  actionURL: string;
  headers: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  dataBody: any;
  timeout?: number;
  params?: any;
}

class BaseAPI {
  public requestAPI = async (props: PropsParams) => {
    const {actionURL, method, dataBody, headers, params} = props;
    const token = get(localServices, 'token.accessToken');
    //   (actionURL === AUTHEN_URL.refreshToken
    //     ? get(localServices, 'token.refreshToken')
    //     : get(localServices, 'token.accessToken')) || '';

    headers.Authorization = `Bearer ${token}`;
    headers['App-Name'] = 'App-name';
    headers['Content-Type'] = 'application/json';

    let config: {
      method: Method;
      url: string;
      headers: any;
      baseURL: string;
      data?: any;
      params?: any;
    } = {params, method, url: actionURL, headers, baseURL: CONSTANTS.BASE_URL};

    if (dataBody) {
      config = {...config, data: dataBody};
    }
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      throw await this.handleError(error);
    }
  };
  public get = (actionURL: any, headers: any = {}, params?: any) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_GET,
      dataBody: null,
      headers,
      params,
    });
  };

  public post = (actionURL: any, dataBody: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_POST,
      dataBody,
      headers,
    });
  };

  public put = (actionURL: any, dataBody: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_PUT,
      dataBody,
      headers,
    });
  };

  public delete = (actionURL: any, dataBody?: any, headers = {}) => {
    return this.requestAPI({
      actionURL,
      method: METHOD_DELETE,
      dataBody,
      headers,
    });
  };

  handleError = async (error: any) => {
    let result;
    let data;
    const {response} = error;
    if (response) {
      data = await response.data;
      switch (response.status) {
        case HTTP_STATUS.notFound.code:
          result = {...HTTP_STATUS.notFound, data};
          break;
        case HTTP_STATUS.forbidden.code:
          result = {...HTTP_STATUS.forbidden, data};
          break;
        case HTTP_STATUS.unauthorized.code:
          // localServices.clearToken();
          return {...HTTP_STATUS.unauthorized, data};
        case HTTP_STATUS.badRequest.code:
          result = {...HTTP_STATUS.badRequest, data};
          break;
        case HTTP_STATUS.upgradeRequired.code:
          result = {...HTTP_STATUS.upgradeRequired, data};
          break;
        case HTTP_STATUS.notAcceptable.code:
          return {...HTTP_STATUS.notAcceptable};
        case HTTP_STATUS.badGateway.code:
          return {...HTTP_STATUS.badGateway, data};
        default:
          result = {message: 'server error', data};
          break;
      }
    } else {
      result = {message: error.message, data};
    }
    return result;
  };
}

const instance = new BaseAPI();
export {instance as BaseAPI};
