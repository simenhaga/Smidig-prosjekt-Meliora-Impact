import React from 'react';
import { MdHome } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { FaHandshake } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import logo from '../resources/MelioraLogoEditBlack.png';

const Header = () => {
    return (

        <div className={'navigation'}>
            <ul>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><img class="logo" src={logo} alt="Meliora Logo" /></span>
                        
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span className={'icon'}><MdHome/></span>
                        <span className={'text'}>Home</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span className={'icon'}><GoGlobe/></span>
                        <span className={'text'}>Our vision</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span className={'icon'}><FaHandshake/></span>
                        <span className={'text'}>Join us</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span className={'icon'}><MdContacts/></span>
                        <span className={'text'}>Contact</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span className={'icon'}><MdPermIdentity/></span>
                        <span className={'text'}>Sign up</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Header;