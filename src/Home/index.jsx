import React, { useState, useEffect, useCallback } from 'react';
import { List, Button, Input, DotLoading } from 'antd-mobile'
import Axios from 'axios'
import ItemList from '../itemList';
import './index.css';
import { bd_decrypt } from '../utils';
const JSON_DATA = require('../mock/index.json');
const list = JSON.parse(JSON.stringify(JSON_DATA.data))

let timer = null

function Home() {
  const [defaultData, setDetaultData] = useState([])
  const [distanceList, setDistanceList] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [dom, setDom] = useState(HTMLDivElement | null);
  const [loading, setLoading] = useState(true);

  const doSearch = () => {
    dom.scrollTop = 0
    if (searchValue) {
      const jsonData = distanceList.filter(item => item.name.indexOf(searchValue) !== -1)
      setDetaultData(jsonData)
    } else {
      setDetaultData(distanceList)
    }
  }

  const getList = () => {
    const arr = list.map((item) => {
      let dis = Math.floor(window.AMap.GeometryUtil.distance([window.BDlng, window.BDlat], [item.coordinate.gdLon, item.coordinate.gdLat]));
      item.distance = dis
      return item;
    })
    arr.sort((a, b) => {
      return a.distance - b.distance
    })
    setDetaultData(arr)
    setDistanceList(arr)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const getQueryLat = () => {
    timer = setTimeout(() => {
      if (!window.lat && !window.lng) {
        getQueryLat()
      } else {
        alert(3)
        clearTimeout(timer)
        timer = null
        const url = `https://api.map.baidu.com/geoconv/v1/?coords=${window.lng},${window.lat}&from=1&to=5&ak=RaD0EbdQKxU9KOOuKAMGYTZbtKAg3pjO`
        // const url = `/geoconv/v1/?coords=${window.lng},${window.lat}&from=1&to=5&ak=RaD0EbdQKxU9KOOuKAMGYTZbtKAg3pjO`
        Axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://api.map.baidu.com',
            'Access-Control-Allow-Credentials': true,
          }
        }).then(res => {
          alert(JSON.stringify(res))
          if (res && res.data && res.data.result) {
            const gdMap = bd_decrypt(res.data.result[0].y, res.data.result[0].x)
            window.BDlng = res.data.result[0].x;
            window.BDlat = res.data.result[0].y;
            window.GDlng = gdMap.bd_lon;
            window.GDlat = gdMap.bd_lat;
            getList()
          }
        }).catch(err => {
          alert(JSON.stringify(err))
        })
      }
    }, 500)
  }

  useEffect(() => {
    getQueryLat()
  }, [])

  useEffect(() => {
    if (defaultData.length > 0) {
      setData(defaultData.slice(0, 10))
    } else {
      setData([])
    }
  }, [defaultData])

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