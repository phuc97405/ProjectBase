import {action, makeObservable, observable} from 'mobx';
import {authenticateService} from '~services/api';
import {TypeLoginReq} from '~services/api/authen-api';
import {validateEmail} from '~utils';
import {localServices} from '~services/local-service';
import {navigationServices} from '~navigation/navigation-services';
import handleApiError from '~services/api/handle-api_error';
import get from 'lodash.get';

class AuthenModel {
  isLoading = false;
  username: string = '';
  password: string = '';
  msgValidateEmail: string = '';

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      username: observable,
      password: observable,
      msgValidateEmail: observable,
      handleLogin: action,
      setUsername: action,
      setPassword: action,
      onSubmitEmail: action,
    });
  }

  setLoading = (value: boolean = false) => {
    this.isLoading = value;
  };
  setUsername = (value: string) => {
    this.username = value;
  };
  setPassword = (value: string) => {
    this.password = value;
  };
  onSubmitEmail = (refPass: any) => {
    if (validateEmail(this.username)) {
      this.msgValidateEmail = '';
      refPass.current?.focus();
    } else this.msgValidateEmail = 'format email not valid';
  };
  handleLogin = async () => {
    try {
      this.setLoading(true);
      const body: TypeLoginReq = {
        username: this.username,
        password: this.password,
      };
      const response = await authenticateService.login_api(body);
      if (get(response, 'data.data')) {
        await localServices.saveToken(get(response, 'data.data'));
        navigationServices.replace('HomeStackApp');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      this.setLoading(false);
    }
  };
}
export {AuthenModel};
