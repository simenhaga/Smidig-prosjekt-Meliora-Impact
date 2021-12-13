import React from 'react';
import { MdHome } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { FaHandshake } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";

const Header = () => {
    return (

        <div className={'navigation'}>
            <ul>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><MdHome/></span>
                        <span>Home</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><GoGlobe/></span>
                        <span>Our vision</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><FaHandshake/></span>
                        <span>Join us</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><MdContacts/></span>
                        <span>Contact</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><MdPermIdentity/></span>
                        <span>Sign up</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Header;