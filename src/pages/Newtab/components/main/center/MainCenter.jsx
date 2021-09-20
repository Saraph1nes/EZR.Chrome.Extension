import React, { useContext, useEffect, useState } from 'react';
import { Button, List, Select, Spin } from 'antd';
import { juejinApi ,ezrYuQueApi} from '@service/mainCenter';
import moment from 'moment';

import './MainCenter.less';
import { observer } from 'mobx-react';
import { MainCenterStore } from '@model';

const { Option } = Select;

const MainCenter = observer((props) => {
  // const store = useContext(MainCenterStore)
  //
  // console.log(store);

  const [param, setParam] = useState({
    category: 'all',
    limit: 30,
    offset: 0,
    order: 'heat'
  });
  const [dataList, setDataList] = useState([]);
  const [tempOffset, setTempOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [articalType, setArticalType] = useState('ezr');

  /**
   * 掘金文章分类和热度切换钩子
   */
  useEffect(async () => {
    try {
      setLoading(true);
      let tempParam = JSON.parse(JSON.stringify(param));
      tempParam.offset = 0;
      setParam(tempParam);
      setTempOffset(0);
      let res = await juejinApi(param);
      setDataList(res.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [param.order, param.category]);

  /**
   * 掘金加载更多文章钩子
   */
  useEffect(async () => {
    try {
      setLoading(true);
      if (tempOffset !== 0) {
        let res = await juejinApi(param);
        let _tempDataList = JSON.parse(JSON.stringify(dataList));
        res.data.data.forEach(item => {
          _tempDataList.push(item);
        });
        setDataList(_tempDataList);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [tempOffset]);

  /**
   * 列表数据源切换钩子
   */
  useEffect(async () => {
    // let res = await ezrYuQueApi({token:'6406b2ac83ef46549f2d95d455e6fe69',type:'all',page:'1'});
    // console.log(res);
    // console.log(props);
  }, []);

  return (
    <div className='MainCenter'>
      <div className='title'>
        <Select className='sourceSelector'
                onChange={e => setArticalType(e)}
                defaultValue={articalType}>
          <Option value='ezr'>
            <span className='titleSpan'>驿氪</span>
          </Option>
          <Option value='gold'>
            <span className='titleSpan'>掘金</span>
          </Option>
        </Select>
        {articalType === 'ezr' && (
          <div style={{display:'inline-block'}}>
            <Select style={{ background: '#3A3A3A' }}
                    value={'group'}
                    dropdownMatchSelectWidth={false}
            >
              <Option value='group'>小组分享</Option>
              <Option value='my'>我的</Option>
            </Select>
          </div>
        )}
        {articalType === 'gold' && (
          <div style={{display:'inline-block'}}>
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
        )}
      </div>
      {
        articalType === 'ezr' && <div className='ezrList'>123</div>
      }
      {
        articalType === 'gold' && <div className='list'>
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
      }
    </div>
  );
})

export default MainCenter;
