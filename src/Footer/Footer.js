import React from 'react';
import './style.css';
import Logo from "../images/logo1.png"


const Footer = () => {
    return (
        <footer className="footer" style={{width:"100%"}}>
            <div className='columns'>
                <div className='column'>
                    <div className='columns is-vcentered'>
                        <div className="column has-text-right">
                            <img className='logo'
                                src={Logo}
                                alt={"Meliora Impact Logo"}
                            />
                        </div>
                        <div className='column has-text-left is-size-7'>
                            <p className='text'>© 2021 by Meliora Impact. Org.nr 926 638 564</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;