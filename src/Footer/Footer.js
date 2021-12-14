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
        <footer className="footer" style={{ width: "100vw", padding:"0%" }}>
                <div className='columns is-centered'>
                    <div className='column is-9'>
                        <div className='columns is-vcentered'>
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
                        </div>

                        <div className='columns'>
                            <div className='column'>
                                <div className='line' style={{ borderTop: "2px solid lightGrey ", marginBottom: "3%"}}></div>
                            </div>
                        </div>

                        <div className='columns'>
                            <div className='column'>
                                <div className='columns is-vcentered'>
                                    <div className='column has-text-left'>
                                        <img className='logo'
                                            src={Logo}
                                            alt={"Meliora Impact Logo"} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='column'></div>
                            <div className='column'></div>
                            <div className='column has-text-left'>
                                <p className='has-text-weight-semibold'>SITE LINKS</p>
                                <div className='siteList has-text-left' style={{listStyleType:"none"}}>
                                    <a href='#' >Home</a><br />
                                    <a href='#'>Vison</a><br />
                                    <a href='#'>Join Us</a><br />
                                    <a href='#'>Contact</a><br />
                                    <a href='#'>Sign Up</a>
                                </div>
                            </div>
                            <div className='column'>
                                <p className='has-text-weight-semibold'>SOCIALS</p>
                                <div className='socialList has-text-left' style={{listStyleType:"none"}}>
                                    <a href='#' >Facebook</a><br />
                                    <a href='#'>Instagram</a><br />
                                    <a href='#'>LinkedIn</a><br />
                                </div>
                            </div>

                        </div>
                        <div className='columns'>
                            <div className='column has-text-centered is-size-7' style={{marginTop: "2%"}}>
                                <p className='text'>© 2021 by Meliora Impact. Org.nr 926 638 564</p>
                            </div>

                        </div>

                    </div>
                </div>
        </footer>
    );
}

export default Footer;