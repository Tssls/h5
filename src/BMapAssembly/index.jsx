import MapView from './MapView';
import { Popup } from 'antd-mobile'
import { useEffect, useState } from 'react';
import './index.css';

import { parseQueryString, bd_decrypt, bMapTransqqMap } from '../utils';
import {MAP_ICON} from '../mock/icon'

export default function BMapAssembly() {
    const [visible, setVisible] = useState(false)
    const [urlParams,setParams] = useState({})

    const showPop = () => {
        setVisible(true)
    }

    useEffect(() => {
        setParams(parseQueryString())
    },[])

    const barBtnCLick = (e) => {
        e.stopPropagation()
        const decrypt = bd_decrypt(window.lat,window.lng)
        const btnIndex = e.target.getAttribute('i')
        switch (btnIndex) {
            case '1':
                window.location.href = `https://uri.amap.com/navigation?from=${decrypt.bd_lon},${decrypt.bd_lat},我的位置&to=${urlParams.gdLon},${urlParams.gdLat},${urlParams.address}&mode=walk&policy=1&src=mypage&coordinate=gaode&callnative=0`
                break;
            case '2':
                window.location.href = `https://api.map.baidu.com/direction?origin=latlng:${window.lat},${window.lng}|name:我的位置&destination=${urlParams.lat},${urlParams.lng}&mode=driving&region=深圳&output=html&src=webapp.baidu.openAPIdemo`
                break;
            case '4':
                setVisible(false)
                break;
        }
    }

    return (
        <div style={{ width: "100vw", height: "100vh",overflow:'hidden' }}>
            <MapView {...urlParams} />
            <div className='navigation-bar'>
                <div className='bar-text'>
                    <span>{urlParams.name}</span>
                    <span>{urlParams.address}</span>
                </div>
                <img onClick={showPop} src={MAP_ICON} className='bar-icon' />
            </div>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
            >
                <div onClick={barBtnCLick} className='bar-btn'>
                    <button i='1'>高德地图</button>
                    <button i='2'>百度地图</button>
                    <button i='4'>取消</button>
                </div>
            </Popup>
        </div>
    )
}
