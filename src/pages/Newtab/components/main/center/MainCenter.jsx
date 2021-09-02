import React, { useEffect, useState } from 'react';
import { Button, List, Select, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import './MainCenter.less';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const MainCenter = () => {

  const [param, setParam] = useState({
    category: 'all',
    limit: 30,
    offset: 0,
    order: 'heat'
  });
  const [dataList, setDataList] = useState([]);
  const [tempOffset, setTempOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      let tempParam = JSON.parse(JSON.stringify(param));
      tempParam.offset = 0;
      setParam(tempParam);
      setTempOffset(0);
      axios.post('https://e.juejin.cn/resources/gold', param).then(res => {
        setDataList(res.data.data);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [param.order, param.category]);

  useEffect(() => {
    try {
      setLoading(true);
      if (tempOffset !== 0) {
        axios.post('https://e.juejin.cn/resources/gold', param).then(res => {
          let _tempDataList = JSON.parse(JSON.stringify(dataList));
          res.data.data.forEach(item => {
            _tempDataList.push(item);
          });
          setDataList(_tempDataList);
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [tempOffset]);

  return (
    <div className='MainCenter'>
      <div className='title'>
        <Select className='sourceSelector'
                bordered={false}
                defaultValue='gold'>
          <Option value='gold'>
            {/*<img height={28}*/}
            {/*     width={28}*/}
            {/*     src='https://assets-img.ezrpro.com/pc/img/others/gold.svg' />*/}
            <span className='titleSpan'>掘金</span>
          </Option>
        </Select>
        {/*<div className='sourceSelector'>*/}
        {/*  <img height={28}*/}
        {/*       width={28}*/}
        {/*       src='https://assets-img.ezrpro.com/pc/img/others/gold.svg' />*/}
        {/*  <div className='titleSpan'>掘金</div>*/}
        {/*</div>*/}
        <Select style={{ background: '#3A3A3A' }}
                value={param.category}
                dropdownMatchSelectWidth={false}
                onChange={(value, option) => {
                  let tempParam = JSON.parse(JSON.stringify(param));
                  tempParam.category = value;
                  setParam(tempParam);
                }}
        >
          <Option value='all'>首页</Option>
          <Option value='frontend'>前端</Option>
          <Option value='backend'>后端</Option>
          <Option value='android'>Android</Option>
          <Option value='ios'>IOS</Option>
          <Option value='ai'>人工智能</Option>
          <Option value='article'>阅读</Option>
          <Option value='freebie'>开发工具</Option>
          <Option value='career'>代码人生</Option>
        </Select>
        <Select
          value={param.order}
          style={{ background: '#3A3A3A' }}
          onChange={(value, option) => {
            let tempParam = JSON.parse(JSON.stringify(param));
            tempParam.order = value;
            setParam(tempParam);
          }}
        >
          <Option value='heat'>最热</Option>
          <Option value='time'>最新</Option>
        </Select>
      </div>
      <div className='list'
           ref={(ref) => MainCenter.scrollParentRef = ref}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 2,
            xxl: 3
          }}
          dataSource={dataList}
          loading={loading}
          loadMore={<div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              height: '200px',
              lineHeight: '32px'
            }}
          >
            {tempOffset > 175 ? <span style={{ color: '#a9a9a9', userSelect: 'none' }}>———— 没有更多啦 ————</span> :
              <Button onClick={() => {
                let tempParam = JSON.parse(JSON.stringify(param));
                tempParam.offset = tempOffset + param.limit;
                setTempOffset(tempParam.offset);
                setParam(tempParam);
              }}>加载更多</Button>}
          </div>}
          renderItem={(item, index) => {
            return <div key={index}
                        className='itemRow'>
              <a href={item.url}
                 target='_blank'
                 rel='noreferrer'>
                <div className='item'>
                  <div className='repoContent'>
                    <div className='repoHeader'>
                      <span title={item.title}
                            className='titleText'>{item.title}</span>
                    </div>
                    <div className='repoMeta'>
                      <div className='articleInfos'>
                        {item.tags.map((item, index) => <span className='type'
                                                              key={item.id}>{item.tag_name}</span>)}
                        <span
                          style={{ marginLeft: '10px' }}>{moment.duration(moment().diff(item.date.iso)).asHours().toFixed(0) <= 24 ?
                          `${moment.duration(moment().diff(item.date.iso)).asHours().toFixed(0)}小时前` :
                          `${moment.duration(moment().diff(item.date.iso)).asDays().toFixed(0)}天前`}
                        </span>
                      </div>
                      <div className='interactInfo'>
                        <span className='type'>{`赞 ${item.collectionCount}`}</span>
                        <span className='type'>{`评论 ${item.commentCount}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>;
          }}
        />
      </div>
    </div>
  );
};

export default MainCenter;
