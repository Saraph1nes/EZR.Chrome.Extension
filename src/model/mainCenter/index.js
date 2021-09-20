import {
  action
} from 'mobx';
import {
  juejinApi,
  ezrYuQueApi
} from '@services/mainCenter';
import { createContext } from 'react';

class MainCenterStore {
  @action juejinApi = async (param) => {
    let res = await juejinApi(param);
    console.log(res);
  }

  @action ezrYuQueApi = async (param) => {
    let res = await ezrYuQueApi(param);
    console.log(res);
  }
}

export default createContext(new MainCenterStore()); //react-hooks中使用
