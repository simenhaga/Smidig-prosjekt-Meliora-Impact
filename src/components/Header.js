import React from 'react';

const Header = () => {
    return (
        <div className={'navigation'}>
            <ul>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span><img class="logo" src="./resources/MelioraLogo.png" alt="Meliora Logo" /></span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span></span>
                        <span>Home</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span></span>
                        <span>Our Vision</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span></span>
                        <span>Join us</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span></span>
                        <span>Contact</span>
                    </a>
                </li>
                <li className={'menu-list'}>
                    <a href={'#'}>
                        <span></span>
                        <span>Sign Up</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Header;