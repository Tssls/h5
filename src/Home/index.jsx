import React, { useState, useEffect, useCallback } from 'react';
import { List, Button, Input, DotLoading } from 'antd-mobile'
import gcoord from 'gcoord'
import ItemList from '../itemList';
import './index.css';
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
      let dis = Math.floor(window.AMap.GeometryUtil.distance([window.GDlng, window.GDlat], [item.coordinate.gdLon, item.coordinate.gdLat]));
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
        clearTimeout(timer)
        timer = null
        var BDresult = gcoord.transform(
          [113.89687625351715, 22.57724929459966],    
          gcoord.WGS84,              
          gcoord.BD09                  
        );
        var GDresult = gcoord.transform(
          [113.89687625351715, 22.57724929459966], 
          gcoord.WGS84,             
          gcoord.GCJ02                   
        );
        window.BDlng = BDresult[0];
        window.BDlat = BDresult[1];
        window.GDlng = GDresult[0];
        window.GDlat = GDresult[1];
        getList()
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