import React from 'react';

import PKG from './package.json';
import JS from './assets/js/index.js';

import {SVG} from '../../common/elements/svg/';

const Logo = '<use xlink:href="#logo" />';

function Header(props) {
    const {title} = props;

    return (
        <header>
            <SVG width="61" height="22" href="logo" />
        </header>
    );
}

Header.JS = JS;
Header.PKG = PKG;

export default Header;
