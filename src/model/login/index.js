import {
  action, observable
} from 'mobx';
import {
  loginWithPhone,
  captcha,
  auth
} from '@services/login';
import { createContext } from 'react';

class LoginInfoStore {
  @observable token = localStorage.getItem('token');

  @observable userInfos = {}

  @action loginWithPhone = async () => {
    await loginWithPhone();
  }
}

export default createContext(new LoginInfoStore()); //react-hooks中使用
