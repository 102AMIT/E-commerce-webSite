import React from 'react'
import playStore from '../../../images/playStore.png'
import appStore from '../../../images/appStore.png'
const Footer = () => {
  return (
    <footer className="footer">
        <div className="leftFooter">
        <h4>Download Our APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
        </div>

        <div className="middleFooter">
        </div>

        <div className="rightFooter">
        </div>
    </footer>
  )
}

export default Footer