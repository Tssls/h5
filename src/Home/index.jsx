import React, { useState, useEffect, useCallback } from 'react';
import { List, Button, Input, DotLoading } from 'antd-mobile'
import ItemList from '../itemList';
import './index.css';
import { bd_decrypt } from '../utils';
const JSON_DATA = require('../mock/index.json');
const list = JSON.parse(JSON.stringify(JSON_DATA.data))

function Home() {
  const [defaultData, setDetaultData] = useState([])
  const [distanceList, setDistanceList] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [dom, setDom] = useState(HTMLDivElement | null);
  const [loading, setLoading] = useState(true);
  const [locations, setLoactions] = useState({})

  const doSearch = () => {
    dom.scrollTop = 0
    if (searchValue) {
      const jsonData = distanceList.filter(item => item.name.indexOf(searchValue) !== -1)
      setDetaultData(jsonData)
    } else {
      setDetaultData(distanceList)
    }
  }

  const getLocations = new Promise((res, rej) => {
    var geolocation = new window.BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        res(r.point)
        return false;
      }
      else {
        rej(this.getStatus())
      }
    }, { enableHighAccuracy: true });
  })

  const getList = useCallback(() => {
    getLocations.then(res => {
      const { lng, lat } = res;
      setLoactions({ lng, lat })
    })
  }, [])

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    if (defaultData.length > 0) {
      setData(defaultData.slice(0, 10))
    } else {
      setData([])
    }
  }, [defaultData])

  useEffect(() => {
    if (Object.keys(locations).length > 0) {
      const {lng,lat} = locations
      window.lng = lng;
      window.lat = lat;
      const gdMap = bd_decrypt(lat, lng)
      const arr = list.map((item) => {
        let dis = Math.floor(window.AMap.GeometryUtil.distance([gdMap.bd_lon, gdMap.bd_lat], [item.coordinate.gdLon, item.coordinate.gdLat]));
        item.distance = dis
        return item;
      })
      arr.sort((a, b) => {
        return a.distance - b.distance
      })
      setDetaultData(arr)
      setDistanceList(arr)
      setLoading(false)
    }
  }, [locations])


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
          <Button className='header-btn' size='small' onClick={doSearch}>
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