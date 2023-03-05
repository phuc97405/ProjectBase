interface IAuthenticate {
  accessToken: string;
  refreshToken: string;
}

class AuthenticateModel {
  accessToken = '';
  refreshToken = '';

  static map(data: IAuthenticate): AuthenticateModel {
    const authenticateTYpe = new AuthenticateModel(data);
    return authenticateTYpe;
  }
  constructor(data?: IAuthenticate) {
    if (data) {
      this.init(data);
    }
  }
  init = (data: IAuthenticate) => {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  };
}

export {AuthenticateModel};
export type {IAuthenticate};
