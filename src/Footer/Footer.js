import React from 'react';
import Logo from "../images/logo1.png"
import Google from "../images/google.png"
import Dnb from "../images/dnb.png"
import Dnv from "../images/dnv.png"
import Entur from "../images/entur.png"
import Microsoft from "../images/microsoft.png"
import "./Footer.css"


const Footer = () => {
    return (
        <><section className="test has-background-black" style={{height:"100vh"}}>
            <div className="section"></div>
        </section>
        
        <section>
            <footer className="footer" style={{ width: "100vw", padding:"0%" }}>
                <section className="trustedPartners" style={{width: "100vw"}}>
                    <div className='columns is-vcentered is-gapless'>
                        <div className='column'></div>
                        <div className='column is-size-6 has-text-right'>
                            <p className='partnersText'>TRUSTED PARTNERS</p>
                        </div>
                        <div className='column' style={{transform: "scale(0.5)"}}>
                                <img className='dnbLogo'
                                    src={Dnb}
                                    alt={"Dnb Logo"} 
                                />
                        </div>
                        <div className='column' style={{transform: "scale(0.5)"}}>
                            <img className='dnvLogo'
                                src={Dnv}
                                alt={"Dnv Logo"} 
                                />
                        </div>
                        <div className='column' style={{transform: "scale(0.5)"}}>
                            <img className='googleLogo'
                                src={Google}
                                alt={"Google Logo"} 
                                />
                        </div>
                        <div className='column' style={{transform: "scale(0.5)"}}>
                            <img className='microsoftLogo'
                                src={Microsoft}
                                alt={"Microsoft Logo"} 
                                />
                        </div>
                        <div className='column' style={{transform: "scale(0.5)"}}>
                            <img className='enturLogo'
                                src={Entur}
                                alt={"Entur Logo"} 
                                />
                        </div>
                        <div className='column'></div>
                    </div>
                    {/* <hr className='line' style={{color:"red", width: "50%"}}></hr> */}
                    <div className='line' style={{ borderTop: "2px solid lightGrey ", width: "69%", marginLeft: "14.3%", marginBottom: "3%"}}></div>
                </section>
                <div className='columns'>
                    <div className='column'>
                        <div className='columns is-vcentered'>
                            <div className='column has-text-right'>
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
        </section></>
    );
}

export default Footer;