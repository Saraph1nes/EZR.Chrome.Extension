import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.less';
import { Image } from 'antd';

const CatImg = () => {

  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=1').then(({ data }) => {
      if (data[0] && data[0].url) {
        setImgUrl(data[0].url);
      }
    });
  }, []);

  return (
    <div className='CatImg'>
      <div className='Title'>
        <span>猫猫图</span>
      </div>
      <div className='content'>
        <Image src={imgUrl}/>
      </div>
    </div>
  );
};

export default CatImg;
