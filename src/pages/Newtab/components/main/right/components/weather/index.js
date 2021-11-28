import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './index.less';
import moment from 'moment';
import { Carousel, Divider, Tag } from 'antd';
import { weekName } from '@/common/constant';

const Weather = () => {

  const [WeatherForecast, setWeatherForecast] = useState({ casts: [] });

  const [WeatherNow, setWeatherNow] = useState({ casts: [] });

  /**
   * 查询adcode用于天气查询
   * @returns {Promise<unknown>}
   */
  const getAdcode = async () => {
    const promise = new Promise((resolve, reject) => {
      axios.get('https://restapi.amap.com/v3/ip?parameters', {
        params: {
          key: '7de0cf8ec1829412982c750abab175cb'
        }
      }).then(res => {
        resolve(res.data.adcode);
      });
    });
    return promise;
  };

  /**
   * 查询预测天气数据
   * @param adcode
   * @returns {Promise<unknown>}
   */
  const getForecastWeather = async (adcode) => {
    const promise = new Promise((resolve, reject) => {
      axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
        params: {
          key: '7de0cf8ec1829412982c750abab175cb',
          city: adcode,
          extensions: 'all'
        }
      }).then(res => {
        resolve(res.data.forecasts[0]);
      });
    });
    return promise;
  };

  /**
   * 查询实时天气数据
   * @param adcode
   * @returns {Promise<unknown>}
   */
  const getNowWeather = async (adcode) => {
    const promise = new Promise((resolve, reject) => {
      axios.get('https://restapi.amap.com/v3/weather/weatherInfo?parameters', {
        params: {
          key: '7de0cf8ec1829412982c750abab175cb',
          city: adcode,
          extensions: 'base'
        }
      }).then(res => {
        resolve(res.data.lives[0]);
      });
    });
    return promise;
  };

  useEffect(async () => {
    setWeatherForecast(await getAdcode().then(getForecastWeather));
    setWeatherNow(await getAdcode().then(getNowWeather));
  }, []);

  return (
    <div className='Weather'>
      <div className='Title'>
        <span>天气</span>
      </div>
      <div className='content'>
        <div className='basicInfos'>
          <span>{`${WeatherNow.province || '未知'} ${WeatherNow.city || '未知'}`}</span>
          <span>{moment().format('YYYY-MM-DD dddd')}</span>
        </div>
        <div className='nowadays'>
          <div>
            <Tag color='green'>{`${WeatherNow.weather || '未知'} ${WeatherNow.temperature || '未知'}℃`}</Tag>
          </div>
          <div>
            <Tag color='cyan'>{`${WeatherNow.winddirection || '未知'}风 ${WeatherNow.windpower || '未知'}级`}</Tag>
          </div>
          <div>
            <Tag color='blue'>{`湿度 ${WeatherNow.humidity || '未知'}`}</Tag>
          </div>
        </div>
        <Divider />
        <div className='predict'>
          <Carousel
            dotPosition='top'
            dots={{ className: 'dotsClass' }}
          >
            {JSON.parse(JSON.stringify(WeatherForecast)).casts.map((Value, Index) => {
              return <div key={Index}
                          className='predictItem'>
                <div className='item'>
                  {weekName[Value.week]}{`(${moment(Value.date).format('MM月DD日')})`}
                </div>
                <div className='item'>
                  {Value.dayweather === Value.nightweather ? Value.dayweather : `${Value.dayweather} 转 ${Value.nightweather}`}
                </div>
                <div className='item'>
                  {Value.daytemp === Value.nighttemp ? Value.daytemp : `${Value.daytemp}℃ ~ ${Value.nighttemp}℃`}
                </div>
                <div className='item'>
                  {Value.daywind === Value.nightwind && Value.daypower === Value.nightpower ?
                    `${Value.daywind}风${Value.daypower}级` :
                    `${Value.daywind}风${Value.daypower}级 ~ ${Value.nightwind}风${Value.nightpower}级`}
                </div>
              </div>;
            })}
          </Carousel>
          <div className='footer'>
            <span>{`发布时间：${WeatherNow.reporttime || '未知'}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
