import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

/**
 * 登录接口
 * @param phoneNum 手机号
 * @param captcha 验证码
 */
const loginWithPhone = async (phoneNum, captcha) => {
  let result;
  const data = {
    Phone: phoneNum,
    Captcha: captcha
  };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: 'http://log-ops.ezrpro.cn/api/LoginWithPhone'
  };
  let res = await axios(options);
  if (res.data.status) {
    message.success('登录成功');
    localStorage.setItem('token',res.data.data.token)
    localStorage.setItem('phone', res.data.data.phone)
  } else {
    message.error('登录失败');
  }
  return res;
};

/**
 * 获取验证码
 * @param phoneNum 手机号
 */
const captcha = (phoneNum) => {
  axios.get(`http://log-ops.ezrpro.cn/api/captcha?${qs.stringify({ phone: phoneNum })}`).then(res => {
    message.success('获取验证码成功，请在企业微信堡垒机查看！');
  });
};

/**
 * 获取权限
 * @param phoneNum token
 */
const auth = async (token) => {
  return await axios.get(`http://log-ops.ezrpro.cn/api/auth?${qs.stringify({ token: token })}`);
};

export { loginWithPhone, captcha,auth };
