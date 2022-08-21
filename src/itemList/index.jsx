import React, { useState } from 'react';
import { Modal } from 'antd-mobile'
import { useHistory } from 'react-router-dom';

import { BTN_ICON, } from '../mock/icon'
import MODAL_ICON from '../image/1.png'
import { time_range, getDistance } from '../utils'

import './index.css'

let week = new Date().getDay();
if (week == 0) {
    week = 7
}
week = week - 1;

export default function ItemList(props) {
    let history = useHistory();
    const { name, distance, address, gd_coordinate, bd_coordinate, ipone, timer = [] } = props;
    const gd = gd_coordinate.split(',');
    const bd = bd_coordinate.split(',');
    const [isModal, setModal] = useState(false)
    const historyLink = (event) => {
        event.stopPropagation();
        history.push(`/map?name=${name}&address=${address}&lat=${Number(bd[1])}&lng=${Number(bd[0])}&gdLon=${Number(gd[0])}&gdLat=${Number(gd[1])}`)
    }

    const showModal = (event) => {
        event.stopPropagation();
        setModal(true)
    }

    const isDoBusiness = () => {
        return time_range(timer[week].value[0], timer[week].value[1]) ? '营业中' : '休息中'
    }

    const doBusinessTimer = (timer) => {
        if (timer[week].value[0] === '00:00:00' && timer[week].value[1] === '00:00:00') {
            return '今日休息'
        }
        return `${timer[week].value[0]} - ${timer[week].value[1]}`
    }

    const renderModalContext = () => (<div className='modal-text'>
        <img src={MODAL_ICON} alt="" />
        <p>欢迎随时致电门店咨询</p>
        <a href={`tel:${ipone}`}>{ipone}</a>
        {/* <p>悦刻为保护双方隐私安全，号码已做加密处理</p> */}
        <button onClick={() => { setModal(false) }}>我知道了</button>
    </div>)

    return (
        <div className="item-list">
            <div className='item-list-title'>
                <span>{name}</span>
                <span>{getDistance(distance)}</span>
            </div>
            <div onClick={historyLink} className='list-main'>
                <div className='list-main-box'>
                    <p className='main-box-text'>
                        <span style={{ color: `${isDoBusiness() === '营业中' ? '#142A48' : ''}` }}>{isDoBusiness()}</span>
                        <span></span>
                        <span>{doBusinessTimer(timer)}</span>
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