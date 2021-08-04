import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, Select } from 'antd';

import './index.less';

const { Option } = Select;

const searchSelectorList = [
  {
    value: 'google',
    src: 'https://assets-img.ezrpro.com/pc/img/others/google.b2aa33a4.png'
  }, {
    value: 'baidu',
    src: 'https://assets-img.ezrpro.com/pc/img/others/baidu.10d6d640.png'
  }, {
    value: 'github',
    src: 'https://assets-img.ezrpro.com/pc/img/others/github.cef68f2e.png'
  }, {
    value: 'stackOverflow',
    src: 'https://assets-img.ezrpro.com/pc/img/others/stack-overflow.86a0756c.png'
  }, {
    value: 'bing',
    src: 'https://assets-img.ezrpro.com/pc/img/others/bing.87fce0cd.png'
  }, {
    value: 'bilibili',
    src: 'https://assets-img.ezrpro.com/pc/img/others/bing.87fce0cd.png'
  }, {
    value: 'gitee',
    src: 'https://assets-img.ezrpro.com/pc/img/others/gitee2.png'
  }
];

const defaultQuickNavList = [{
  title: '知乎',
  url: 'https://www.zhihu.com'
}, {
  title: 'bilibili',
  url: 'https://www.bilibili.com/'
}, {
  title: 'github',
  url: 'https://www.github.com'
}];

const SearchPanel = () => {
  const [form] = Form.useForm();
  const [quickNavList, setQuickNavList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectValue, setSelectValue] = useState('google');
  const [isModalVisible, setModalVisible] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [canAdd, setCanAdd] = useState(true);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    // localStorage.setItem('quickNavList',JSON.stringify([{
    //   title: '知乎',
    //   url: 'https://www.zhihu.com',
    // }, {
    //   title: 'bilibili',
    //   url: 'https://www.bilibili.com/',
    // }, {
    //   title: 'github',
    //   url: 'https://www.github.com',
    // }]))
    let item = localStorage.getItem('quickNavList');
    if (item) {
      console.log(JSON.parse(item), '有item');
      setQuickNavList(JSON.parse(item));
    } else {
      console.log(JSON.parse(item), '无item');
      setQuickNavList(defaultQuickNavList);
      localStorage.setItem('quickNavList', JSON.stringify(defaultQuickNavList));
    }
  }, []);

  useEffect(() => {
    if (quickNavList.length > 9) {
      setCanAdd(false);
    } else {
      setCanAdd(true);
    }
  }, [quickNavList]);

  const submit = (e) => {
    let res = JSON.parse(localStorage.getItem('quickNavList'));
    try {
      if (editItem) {
        // let findItem = res.filter(v=>{
        //   return v.title === editItem.title && v.url === editItem.url
        // });
        // if (findItem.length > 0){
        //
        // }
        res.map((v, i) => {
          if (v.title === editItem.title && v.url === editItem.url) {
            res.splice(i, 1, e);
          }
        });
        localStorage.setItem('quickNavList', JSON.stringify(res));
        setQuickNavList(res);
        message.success('修改成功');
      } else {
        res.push(e);
        localStorage.setItem('quickNavList', JSON.stringify(res));
        setQuickNavList(res);
        message.success('增加成功');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setEditItem(null);
      setAddNew(false);
      form.resetFields();
    }
  };

  const linkItemEdit = (item, index) => {
    try {
      setEditItem(item);
      setAddNew(true);
      form.setFieldsValue(item);
    } catch (e) {
      console.error(e);
    }
  };

  const linkItemAdd = (item, index) => {
    try {
      let res = JSON.parse(localStorage.getItem('quickNavList'));
      res.splice(index, 1);
      localStorage.setItem('quickNavList', JSON.stringify(res));
      setQuickNavList(res);
      message.success('删除成功');
    } catch (e) {
      console.error(e);
    }
  };

  const search = () => {
    switch (selectValue) {
      case 'baidu':
        window.open(`https://www.baidu.com/s?wd=${searchInput}`, '_blank')
        break
      case 'google':
        window.open(`https://www.google.com/search?q=${searchInput}`, '_blank')
        break
      case 'github':
        window.open(`https://github.com/search?q=${searchInput}`, '_blank')
        break
      case 'stackOverflow':
        window.open(`https://search.gitee.com/?skin=rec&type=repository&q=${searchInput}`, '_blank')
        break
      case 'bing':
        window.open(`https://cn.bing.com/search?q=${searchInput}`, '_blank')
        break
      case 'bilibili':
        window.open(`https://search.bilibili.com/all?keyword=${searchInput}`, '_blank')
        break
      case 'gitee':
        window.open(`https://search.gitee.com/?skin=rec&type=repository&q=${searchInput}`, '_blank')
        break
    }
  }

  return (
    <React.Fragment>
      <div className='searchPanel'>
        <div className='searchInput'>
          <div className='searchSelector'>
            <Select
              value={selectValue}
              onChange={(e)=>{
                setSelectValue(e)
              }}
              defaultValue='google'
                    style={{ width: '70px', height: '40px' }}>
              {searchSelectorList.map((v, i) => {
                return (
                  <Option key={i}
                          className='options'
                          value={v.value}>
                    <img style={{ width: '28px', height: '28px' }}
                         src={v.src}
                         className='searchSelectorImg' />
                  </Option>
                );
              })}
            </Select>
          </div>
          <Input id='ezrSearchInput'
                 placeholder='请输入关键字搜索'
                 value={searchInput}
                 onChange={(e)=>{
                   setSearchInput(e.target.value)
                 }}
                 onKeyDown={(e) => {
                   if (e.code === "Enter"){
                     search()
                   }
                 }} />
        </div>
        <div className='quickNav'>
          <ul className='list'>
            <li className='header'>快捷导航</li>
            {quickNavList.map((item, index) => {
              return (
                <li key={index}
                    className='item'>
                  <a style={{ display: 'flex' }}
                     href={item.url}
                     target='_blank'
                     rel='noreferrer'>
                    <span className='title'>{item.title}</span>
                  </a>
                </li>
              );
            })}
            <li className='more'
                onClick={() => {
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
              {!addNew && canAdd && <Button onClick={() => {
                setAddNew(true);
              }}
                                            className='actionBtn'>+新建快捷导航</Button>}
              {addNew && <Button onClick={() => {
                setAddNew(false);
              }}
                                 className='actionBtn'>取消</Button>}
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
        afterClose={() => {
          setAddNew(false);
          setEditItem(null);
        }}
        bodyStyle={{ minHeight: '450px', padding: '0' }}
      >
        <Form
          form={form}
          onFinish={submit}
          style={addNew ? {} : { display: 'none' }}
          className='addLink'
          layout='inline'>
          <Form.Item name='url'
                     className='item'
                     labelAlign='right'
                     required
                     label='URL'
                     colon
                     rules={[{ required: true, type: 'url', message: '请输入正确的url!' }]}>
            <Input className='input'
                   placeholder='请输入链接地址' />
          </Form.Item>
          <Form.Item name='title'
                     className='item name'
                     labelAlign='right'
                     label='名称'
                     colon>
            <Input className='input'
                   placeholder='首页最多展示五个字' />
          </Form.Item>
          <Button htmlType='submit'
                  style={{ marginLeft: '20px', marginTop: 'auto' }}
                  type='primary'>确定</Button>
        </Form>
        <ul className='linkList'>
          {quickNavList.map((item, index) => {
            return (
              <li key={index}
                  className='linkItem'>
                <a style={{ display: 'flex' }}
                   href={item.url}
                   target='_blank'
                   rel='noreferrer'>
                  <span className='title'>{item.title}</span>
                  <div className='actionBtn'
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                       }}>
                    <span>···</span>
                    <ul className='dropdownMenu'>
                      <li className='item'
                          onClick={() => {
                            linkItemEdit(item, index);
                          }}>编辑
                      </li>
                      <li className='item'
                          onClick={() => {
                            linkItemAdd(item, index);
                          }}>删除
                      </li>
                    </ul>
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
