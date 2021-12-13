import React from 'react';
import { MdHome } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { FaHandshake } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import logo from '../resources/MelioraLogoEditBlack.png';

const Header = () => {
    const list = document.querySelectorAll('.list')
    function activateLink() {
        list.forEach((item) =>
        item.classList.remove('active'))
        this.classList.add('active')
    }
    list.forEach((item) =>
    item.addEventListener('click', activateLink))


    return (
        <div className='container header-cont is-fluid'>
            <div className='columns is-vcentered'>
                <div className='column is-8 has-text-left'>
                    <img style={{transform: 'scale(0.8)'}} src={logo}/>

                </div>
                <div className='column'>
                    <div className={'navigation-container'}>
                        <ul>
                            <li className={'list active'}>
                                <a href={'#'}>
                                    <span className={'icon'}><MdHome/></span>
                                    <span className={'text'}>Home</span>
                                </a>
                            </li>
                            <li className={'list'}>
                                <a href={'#'}>
                                    <span className={'icon'}><GoGlobe/></span>
                                    <span className={'text'}>Vision</span>
                                </a>
                            </li>
                            <li className={'list'}>
                                <a href={'#'}>
                                    <span className={'icon'}><FaHandshake/></span>
                                    <span className={'text'}>Join us</span>
                                </a>
                            </li>
                            <li className={'list'}>
                                <a href={'#'}>
                                    <span className={'icon'}><MdContacts/></span>
                                    <span className={'text'}>Contact</span>
                                </a>
                            </li>
                            <li className={'list'}>
                                <a href={'#'}>
                                    <span className={'icon'}><MdPermIdentity/></span>
                                    <span className={'text'}>Sign up</span>
                                </a>
                            </li>
                            <div className={'indicator'}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;