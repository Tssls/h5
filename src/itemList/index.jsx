import React, { useState } from 'react';
import { Modal } from 'antd-mobile'
import './index.css'


const BTN_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAAXNSR0IArs4c6QAAActQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Sem/EQAAAJh0Uk5TAAECAwQFBwgJCgsMDg8QERMUFxkbHB0fICIlKiwvMDEzNTY3OTxDSElLTE1OUVJTVFdYWl5fYWJlZmdpa21ucXN0dnh5ent8gIGCg4SGiImMjY6PkJKVlpydn6Klp6ipqq2wsbO2uLu9v8HCxcbHyMnLzdDR09TV19jZ2t3f4OHi5OXm5+jp6uvt7u/x8vP09vf4+fr8/f4sZxqlAAAB5klEQVQYGe3B+UOLcRwH8HctHTMmV44VYY65yn2tkisRIkImx4Y5IkcpsTSSwrOt4f3nKszzeZ49z/f5+pnXC/+uNccuJ1P5zNRAvDUEbaGOEQqp7tXQUXODdt9jy+HFfypLB/mLASjVvKCLwWVQqH9PV+Pr4CqSoUK2AS5qDSrl6uGo+jU9pKrhwJekp7s+FNtPDUdQxP+OGiYDsGujlhOwCRrUMhmA1R5qOgyrBDUlYRHMU9O0H9JOatsI6TS1nYcUo7YEpH5q64P0kVJv+FCGf8TC0RxNQ5A+UUjPAc6w4G0ZcI6mcUhjFJ4A2MyCmwAO0pSFNEzhDYDFLDgOoI2mUUhPKXxdAOARf8mHANyi6QGkOKVdAFbm+FM7gEqDph5IRyk9KwFQN0gyEy0B0EyhHVKYFvsww1e7e/08zFg0QSECqTxHKbsWpoqHFD6Xw+IeLb5EULDwMaXrsNpKm94QZs1vmaJFI6xKR2g3FLtwJZmnVboSNk3UcgB2c9PUMFyGIhuooQEOuunpKpxUvaKH/go4ilLtw1I420alsTq42E6V50vgZi8VEgG4aqWr0UYodNKFcbIKKj10Mn17hx9qXSyYuNbZcSl2py/e1bQpCE+rvnHWy7PhUvydLQPG/ZYV+O+3H3+BhxX5QOtgAAAAAElFTkSuQmCC';

export default function ItemList(props) {
    const { name, distance, timer, address } = props
    const [isModal, setModal] = useState(false)
    const [ipone,setIpone] = useState('166-2080-9433')
    
    const renderModalContext = () => (<div className='modal-text'>
        <img src="https://oss-static.relxtech.com/h5/relx-map/static/anquan.687b832a.png" alt="" />
        <p>欢迎随时致电门店咨询</p>
        <a href={`tel:${ipone}`}>168-1686-16888</a>
        <p>悦刻为保护双方隐私安全，号码已做加密处理</p>
        <button onClick={()=>{setModal(false)}}>我知道了</button>
    </div>)

    return (
        <div className="item-list">
            <div className='item-list-title'>
                <span>{name}</span>
                <span>{distance}</span>
            </div>
            <div className='list-main'>
                <div className='list-main-box'>
                    <p className='main-box-text'>
                        <span>营业中</span>
                        <span></span>
                        <span>{timer}</span>
                    </p>
                    <p>{address}</p>
                </div>
                <div onClick={()=>{setModal(true)}} className='list-main-btn'>
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