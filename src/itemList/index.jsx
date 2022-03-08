import React, { useState } from 'react';
import { Modal } from 'antd-mobile'
import { useHistory } from 'react-router-dom';

import { BTN_ICON,  } from '../mock/icon'
import MODAL_ICON from '../image/1.png'
import {time_range} from '../utils'

import './index.css'

export default function ItemList(props) {
    let history = useHistory();
    const { name, distance, startTime,endTime, address,coordinate,ipone } = props
    const [isModal, setModal] = useState(false)
    
    const historyLink = (event) => {
        event.stopPropagation();
        history.push(`/map?name=${name}&address=${address}&lat=${coordinate.lat}&lng=${coordinate.lng}&gdLon=${coordinate.gdLon}&gdLat=${coordinate.gdLat}`)
    }

    const showModal = (event) => {
        event.stopPropagation();
        setModal(true)
    }
    
    const renderModalContext = () => (<div className='modal-text'>
        <img src={MODAL_ICON} alt="" />
        <p>欢迎随时致电门店咨询</p>
        <a href={`tel:${ipone}`}>{ipone}</a>
        <p>悦刻为保护双方隐私安全，号码已做加密处理</p>
        <button onClick={()=>{setModal(false)}}>我知道了</button>
    </div>)

    return (
        <div className="item-list">
            <div className='item-list-title'>
                <span>{name}</span>
                <span>{distance}</span>
            </div>
            <div onClick={historyLink} className='list-main'>
                <div className='list-main-box'>
                    <p className='main-box-text'>
                        <span style={{color:`${time_range(startTime,endTime) ? '#00b578' :''}`}}>{time_range(startTime,endTime) ? '营业中':'休息中'}</span>
                        <span></span>
                        <span>{`${startTime} - ${endTime}`}</span>
                    </p>
                    <p>{address}</p>
                </div>
                <div onClick={showModal} className='list-main-btn'>
                    <img src={BTN_ICON} />
                    联系门店
                </div>
            </div>
            <Modal
                className="modal-style"
                visible={isModal}
                content={renderModalContext()}
                closeOnAction
                closeOnMaskClick
                showCloseButton
                onClose={() => {
                    setModal(false)
                }}
            />
        </div>
    )
}