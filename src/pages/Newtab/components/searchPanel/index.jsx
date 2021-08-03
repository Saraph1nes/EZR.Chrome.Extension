import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, Select } from 'antd';

import './index.less';

const { Option } = Select;

const searchSelectorList = [
  {
    value: 'gg',
    src: 'https://assets-img.ezrpro.com/pc/img/others/google.b2aa33a4.png',
  }, {
    value: 'bd',
    src: 'https://assets-img.ezrpro.com/pc/img/others/baidu.10d6d640.png',
  }, {
    value: 'gh',
    src: 'https://assets-img.ezrpro.com/pc/img/others/github.cef68f2e.png',
  }, {
    value: 'so',
    src: 'https://assets-img.ezrpro.com/pc/img/others/stack-overflow.86a0756c.png',
  }, {
    value: 'bing',
    src: 'https://assets-img.ezrpro.com/pc/img/others/bing.87fce0cd.png',
  },
];

const SearchPanel = () => {
  const [quickNavList, setQuickNavList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    localStorage.setItem('quickNavList',JSON.stringify([{
      title: '知乎',
      url: 'https://www.zhihu.com',
    }, {
      title: 'bilibili',
      url: 'https://www.bilibili.com/',
    }, {
      title: 'github',
      url: 'https://www.github.com',
    }]))
    let item = localStorage.getItem('quickNavList');
    console.log(JSON.parse(item));
    if(item) {
      setQuickNavList(JSON.parse(item));
    } else {
      setQuickNavList([{
        title: '知乎',
        url: 'https://www.zhihu.com',
      }, {
        title: 'bilibili',
        url: 'https://www.bilibili.com/',
      }, {
        title: 'github',
        url: 'https://www.github.com',
      }]);
    }
  }, []);

  const submit = (e) => {
    let res = JSON.parse(localStorage.getItem('quickNavList'));
    console.log(res);
    localStorage.setItem('quickNavList',res.push(e))
    setQuickNavList(JSON.parse(localStorage.getItem('quickNavList')));
  }

  return (
    <React.Fragment>
      <div className='searchPanel'>
        <div className='searchInput'>
          <div className='searchSelector'>
            <Select defaultValue='gg' style={{ width: '70px', height: '40px' }}>
              {searchSelectorList.map((v, i) => {
                return (
                  <Option key={i} className='options' value={v.value}>
                    <img style={{ width: '28px', height: '28px' }}
                         src={v.src}
                         className='searchSelectorImg' />
                  </Option>
                );
              })}
            </Select>
          </div>
          <Input id='ezrSearchInput' placeholder='请输入关键字搜索' />
        </div>
        <div className='quickNav'>
          <ul className='list'>
            <li className='header'>快捷导航</li>
            {quickNavList.map((item, index) => {
              return (
                <li key={index} className='item'>
                  <a style={{ display: 'flex' }} href={item.url} target='_blank'>
                    <span className='title'>{item.title}</span>
                  </a>
                </li>
              );
            })}
            <li className='more' onClick={() => {
              setModalVisible(true);
            }}>···
            </li>
          </ul>
        </div>
      </div>
      <Modal
        centered
        className='editNavModal'
        title={
          <React.Fragment>
            <div className='header'>
              <div className='title'>快捷导航</div>
              {addNew || <Button onClick={()=>{setAddNew(true)}} className='actionBtn'>+新建快捷导航</Button>}
              {addNew && <Button onClick={()=>{setAddNew(false)}} className='actionBtn'>取消</Button>}
            </div>
          </React.Fragment>
        }
        width={620}
        visible={isModalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        closable={false}
        footer={null}
        bodyStyle={{ minHeight: '450px', padding: '0' }}
      >
        <Form onFinish={submit} style={addNew ? {} : {display:'none'}} className='addLink' layout='inline'>
          <Form.Item name='url' className='item' required label='URL' colon rules={[{ required:true,type: 'url',message: '请输入正确的url!' }]}>
            <Input className='input' placeholder='请输入链接地址' />
          </Form.Item>
          <Form.Item name='title' className='item name' label='名称' colon>
            <Input className='input' placeholder='首页最多展示五个字' />
          </Form.Item>
          <Button htmlType='submit' style={{marginLeft:'20px',marginTop:'auto'}} type='primary'>确定</Button>
        </Form>
        <ul className='linkList'>
          {quickNavList.map((item, index) => {
            return (
              <li key={index} className='linkItem'>
                <a style={{ display: 'flex' }} href={item.url} target='_blank'>
                  <span className='title'>{item.title}</span>
                  <div className='actionBtn' onClick={(e) => {
                    e.preventDefault();
                  }}>···
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </Modal>
    </React.Fragment>
  );

};

export default SearchPanel;
