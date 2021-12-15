import React, {useState} from "react";

import './app-header.scss'
const AppHeader = () => {
    const [isStatus, setStatus] = useState(false);
    const [isValue, setValue] = useState('Это мой статус');

    return (
        <div className="AppHeader">
            <div className="AppHeader__hallow-wrapper">
                <div className="hallow">Здравствуйте,</div>

                <div className="user-wrapper">
                    <div className="top-zone">
                        <span className="user"> Человек №3595648</span>
                        <button className="status-btn" onClick={() => setStatus(true)}>Сменить статус</button>
                    </div>
                    {isStatus ? (
                            <form onSubmit={() => setStatus(false)}>
                                <input
                                    className="status"
                                    value={isValue}
                                    onChange={(e)=>setValue(e.target.value)}/>
                            </form>
                        )
                        : (
                            <div className="status">{isValue}</div>

                        )}
                </div>
            </div>
        </div>
    );
};

export default AppHeader;