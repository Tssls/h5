import React, { useState, useEffect } from 'react';
import { List, Button, Input, DotLoading } from 'antd-mobile'
import ItemList from '../itemList';
import './index.css';
import { bMapTransqqMap } from '../utils';
const JSON_DATA = require('../mock/index.json');
const list = JSON.parse(JSON.stringify(JSON_DATA.data))

function Home() {
  const [defaultData, setDetaultData] = useState([])
  const [distanceList,setDistanceList] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [dom, setDom] = useState(HTMLDivElement | null);
  const [loading, setLoading] = useState(true);

  const doSearch = () => {
    dom.scrollTop = 0
    if (searchValue) {
      const jsonData = list.filter(item => item.name.indexOf(searchValue) !== -1)
      setDetaultData(jsonData)
    } else {
      setDetaultData(list)
    }
  }

  useEffect(() => {
    window.jWeixin.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxe73752be84bedd52', // 必填，公众号的唯一标识
      timestamp: '1', // 必填，生成签名的时间戳
      nonceStr: '2', // 必填，生成签名的随机串
      signature: '3',
      jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
    });
    window.jWeixin.ready(function () {
      window.jWeixin.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          console.log('res', res)
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          alert(latitude)
        },
        fail: function (err) {
          console.log('err', err)
        }
      });
    });
    setTimeout(() => {
      const gdMap = bMapTransqqMap(window.lat, window.lng)
      const arr = distanceList.map((item) => {
        let dis = Math.floor(window.AMap.GeometryUtil.distance([gdMap.bd_lon, gdMap.bd_lat], [item.coordinate.gdLon, item.coordinate.gdLat]));      
        item.distance = dis
        return item;
      })
      arr.sort((a, b) => {
        return a.distance - b.distance
      })
      setDetaultData(arr);
      setLoading(false)
    }, 1500)
  }, [distanceList])

  useEffect(() => {
    if (defaultData.length > 0) {
      setData(defaultData.slice(0, 10))
    } else {
      setData([])
    }
  }, [defaultData])

  useEffect(() => {
    setDistanceList(list)
  }, [])


  const handleOnScroll = () => {
    if (dom) {
      const contentScrollTop = dom.scrollTop;
      const clientHeight = dom.clientHeight;
      const scrollHeight = dom.scrollHeight;
      if (contentScrollTop + clientHeight + 10 >= scrollHeight && data.length < defaultData.length) {
        setData(defaultData.slice(0, data.length + 10))
      }
    }
  };

  const searchChange = (e) => {
    setValue(e)
  }

  if (loading) {
    return (<div className='loading' style={{ color: '#142A48' }}>
      <DotLoading color='currentColor' />
      <span>加载中...</span>
    </div>)
  }

  return (
    <div className="App" >
      <div onScrollCapture={handleOnScroll} ref={(dom) => {
        setDom(dom);
      }} className='box-scroll'>
        <div className="header">
          <Input onChange={searchChange} value={searchValue} placeholder='请输入店铺名称' clearable />
          <Button className='header-btn' size='small' color='primary' onClick={doSearch}>
            搜索
          </Button>
        </div>
        <List>
          {data.map((item, index) => (
            <List.Item key={index}><ItemList {...item} /></List.Item>
          ))}
        </List>
        {
          data.length >= defaultData.length && <p className='tips-text'>没有更多了...</p>
        }
      </div>
    </div>
  );
}

export default Home;