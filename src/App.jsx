import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InfiniteScroll, List, SearchBar, Button } from 'antd-mobile'
import {Map, Marker, NavigationControl, InfoWindow,MapTypeControl} from 'react-bmapgl';
import ItemList from './itemList';
import './App.css';
// const wx = require('http://res2.wx.qq.com/open/js/jweixin-1.6.0.js')
// import images from '../public/images/微信图片_20210116215200'

const JSON_DATA = require('./index.json');

function App() {
  const elementRef = useRef(null);
  const [defaultData, setDetaultData] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [acount, setAcount] = useState(1)

  // let icon1 = new BMapGL.Icon(images, new BMapGL.Size(20, 20))

  const doSearch =() => {
    elementRef.current.scrollTop = 0
    if (searchValue) {
      const jsonData = JSON_DATA.data.filter(item => item.name.indexOf(searchValue) !== -1)
      setDetaultData(jsonData)
    } else {
      setDetaultData(JSON_DATA.data)
    }
  }

  useEffect(() => {
    // let map = new Map();
    // console.log(map)
    setDetaultData(JSON_DATA.data)
  }, [])

  useEffect(() => {
    if (defaultData.length > 0) {
      setData(defaultData.slice(0,10))
    } else {
      setData([])
    }
  }, [defaultData])


  const onScroll = (e) => {
    const refScrollTop = elementRef.current.scrollTop;
    const refClientHeight = elementRef.current.clientHeight
    const refScrollHeight = elementRef.current.scrollHeight
    if (acount * 10 >= defaultData.length) {
      return false
    }
    if ((refScrollTop + refClientHeight + 10) >= refScrollHeight) {
      setAcount(acount + 1);
    }
  }

  useEffect(() => {
    if (!acount) return false;
    setData(defaultData.slice(0, acount * 10))
  }, [acount])

  useEffect(() => {
    elementRef.current.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  })


  const searchChange = useCallback((e) => {
    setValue(e)
  },[])

  return (
    <div className="App" >
      <div ref={elementRef} className='box-scroll'>
        <div className="header">
          <div className="left">
            <SearchBar onChange={searchChange} value={searchValue} placeholder='请输入店铺名称' />
          </div>
          <div className="right">
            <Button size='small' color='primary' onClick={doSearch}>
              搜索
            </Button>
          </div>
        </div>
        <List>
          {data.map((item, index) => (
            <List.Item key={index}><ItemList {...item} /></List.Item>
          ))}
        </List>
        {
          acount * 10 >= defaultData.length && <p className='tips-text'>没有更多了...</p>
        }
      </div>
    </div>
  );
}

export default App;