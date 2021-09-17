import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Checkbox, Form, Input, message, Modal, Switch } from 'antd';

import { loginWithPhone, captcha,auth } from '@service/login';

const Navbar = (props) => {

  const [isLogin,setIsLogin] = useState(false);

  const [inputPhoneNum, setInputPhoneNum] = useState('');

  const [inputCaptcha, setInputCaptcha] = useState('');

  const [loginModelVisible, setLoginModelVisible] = useState(false);

  const [comfirmBtnLoading, setComfirmBtnLoading] = useState(false);

  const [form] = Form.useForm();

  const { setShowGame, showGame } = props;

  useEffect(()=>{
    const localStorageToken = localStorage.getItem('token');
    auth(localStorageToken).then(res => {
      if (res.data.status){
        setIsLogin(true);
      }else {
        setIsLogin(false);
      }
    })
  },[])

  const handleSwitchChange = (e) => {
    setShowGame(e);
    // setLocalStorageItem('gameMode', e);
  };

  const openLoginModel = () => {
    setInputPhoneNum('');
    setInputCaptcha('');
    setLoginModelVisible(true);
  };

  const handleGetCaptcha = () => {
    const phoneRgx = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (inputPhoneNum === '') {
      message.error('手机号不能为空');
      return;
    }
    if (!inputPhoneNum.match(phoneRgx)) {
      message.error('您输入的不为手机号');
      return;
    }
    captcha(inputPhoneNum);
  };

  const handleLogin = async () => {
    const phoneRgx = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (inputPhoneNum === '') {
      message.error('手机号不能为空');
      return;
    }
    if (!inputPhoneNum.match(phoneRgx)) {
      message.error('您输入的不为手机号');
      return;
    }
    if (inputCaptcha === '') {
      message.error('验证码不能为空');
      return;
    }
    if (inputCaptcha.length !== 5) {
      message.error('请输入五位数的验证码');
      return;
    }
    try {
      setComfirmBtnLoading(true);
      await loginWithPhone(inputPhoneNum, inputCaptcha);
      setLoginModelVisible(false);
    } catch (e) {
      console.error(e);
    } finally {
      setComfirmBtnLoading(false);
    }
  };

  return (
    <div className='navbar'>
      <div className='logoArea'>
        <img
          src='https://assets-img.ezrpro.com/pc/img/others/ui_helplogo.png'
          height='100%'
        />
        <div className='backgroundBanner'>
          <a className='title'
             target='_blank'
             href='https://account.ezrpro.com/Login/Index'
             rel='noreferrer'>EZRpro</a>
        </div>
        <div className='backgroundBanner'>
          <a className='title'
             target='_blank'
             href='https://help.ezrpro.com/admin/'
             rel='noreferrer'>帮助中心</a>
        </div>
      </div>
      <div className='showGameBtn'>
        <div>
          {isLogin ? <span>{`欢迎您，${localStorage.getItem('phone')}`}</span> : <Button onClick={openLoginModel}
                             type='primary'>登录</Button>}
        </div>
      </div>
      {/*<div className='showGameBtn'>*/}
      {/*  <Switch checkedChildren='游戏模式'*/}
      {/*          unCheckedChildren='操作面板'*/}
      {/*          checked={showGame}*/}
      {/*          onChange={handleSwitchChange} />*/}
      {/*</div>*/}
      <Modal
        title='登录'
        cancelText='取消'
        okText='登录'
        visible={loginModelVisible}
        onOk={handleLogin}
        confirmLoading={comfirmBtnLoading}
        onCancel={() => {
          form.resetFields();
          setLoginModelVisible(false);
        }}
      >
        <Form
          form={form}
          preserve={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label='手机号'
            name='phone'
          >
            <Input
              value={inputPhoneNum}
              onChange={(e) => {
                setInputPhoneNum(e.target.value);
              }} />
          </Form.Item>

          <Form.Item
            label='验证码'
            name='captcha'
          >
            <Input
              style={{ display: 'inline-block', width: '270px' }}
              value={inputCaptcha}
              onChange={(e) => {
                setInputCaptcha(e.target.value);
              }} />
            <Button style={{ float: 'right' }}
                    type='primary'
                    onClick={handleGetCaptcha}>获取验证码</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Navbar;
