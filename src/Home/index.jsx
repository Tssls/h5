import React, { useState, useEffect } from 'react';
import { List, Button,Input } from 'antd-mobile'
import ItemList from '../itemList';
import './index.css';

const JSON_DATA = require('../mock/index.json');
const list = JSON.parse(JSON.stringify(JSON_DATA.data))

function Home() {
  const [defaultData, setDetaultData] = useState([])
  const [data, setData] = useState([])
  const [searchValue, setValue] = useState('')
  const [dom, setDom] = useState(HTMLDivElement | null);

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
    setDetaultData(list)
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
      if (contentScrollTop + clientHeight >= scrollHeight) {
        setData(defaultData.slice(0, data.length + 10))
      }
    }
  };

  const searchChange = (e) => {
    setValue(e)
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