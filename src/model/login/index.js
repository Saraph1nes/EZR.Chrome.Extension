import {
  action, observable
} from 'mobx';
import {
  loginWithPhone,
  captcha,
  auth
} from '@services/login';
import { createContext } from 'react';
import { message } from 'antd';

class LoginInfoStore {
  @observable isLogin = false;

  @observable token = localStorage.getItem('token');

  @observable userInfos = {};

  @action loginWithPhone = async (param) => {
    await loginWithPhone(param);
  };

  @action captcha = async (param) => {
    await captcha(param);
  };

  @action auth = async () => {
    const res = await auth({ token: this.token });
    if (res.data.status) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      localStorage.setItem('token', '');
      message.error('未登录');
    }
  };
}

export default createContext(new LoginInfoStore()); //react-hooks中使用
