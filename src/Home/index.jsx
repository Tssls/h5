import React, { useState, useEffect, useCallback } from 'react';
import { List, Button, Input, DotLoading } from 'antd-mobile'
import gcoord from 'gcoord'
import ItemList from '../itemList';
import { xhrApiQuery } from '../xhr';
import './index.css';

let timer = null

function Home() {
  const [defaultData, setDetaultData] = useState([])
  const [distanceList, setDistanceList] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [loading, setLoading] = useState(true);

  const getQuery = () => {
    xhrApiQuery().then(res => {
      if (res.status === 200) {
        const arr = res.data.map((item) => {
          const gd = item.gd_coordinate.split(',');
          let dis = Math.floor(window.AMap.GeometryUtil.distance([window.GDlng, window.GDlat], gd));
          item.distance = dis
          return item;
        })
        arr.sort((a, b) => {
          return a.distance - b.distance
        })
        setDetaultData(arr)
        setDistanceList(arr)
      }
    }).catch(err => {
      console.log('err', err);
    }).finally(() => {
      setLoading(false);
    })
  }

  const doSearch = () => {
    if (searchValue) {
      const jsonData = distanceList.filter(item => item.name.indexOf(searchValue) !== -1)
      setDetaultData(jsonData)
    } else {
      setDetaultData(distanceList)
    }
  }

  const getQueryLat = () => {
    timer = setTimeout(() => {
      if (!window.lat && !window.lng) {
        getQueryLat()
      } else {
        clearTimeout(timer)
        timer = null
        var BDresult = gcoord.transform(
          [window.lng, window.lat],    
          gcoord.WGS84,              
          gcoord.BD09                  
        );
        var GDresult = gcoord.transform(
          [window.lng, window.lat], 
          gcoord.WGS84,             
          gcoord.GCJ02                   
        );
        window.BDlng = BDresult[0];
        window.BDlat = BDresult[1];
        window.GDlng = GDresult[0];
        window.GDlat = GDresult[1];
        getQuery();
      }
    }, 500)
  }

  useEffect(() => {
    getQueryLat()
  }, [])

  useEffect(() => {
    if (defaultData.length > 0) {
      setData(defaultData.slice(0, 8))
    } else {
      setData([])
    }
  }, [defaultData])

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
       <div className='box-scroll'>
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