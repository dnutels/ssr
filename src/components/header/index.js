import React from 'react';

import PKG from './package.json';
import JS from './assets/js/index.js';

import {SVG} from '../../../lib/elements/svg/';
import {Button} from '../../../lib/elements/button/';

const Logo = '<use xlink:href="#logo" />';

function Header(props) {
    const {title} = props;

    return (
        <header>
            <SVG width="61" height="22" href="logo" />
            <Button>AAAA</Button>
            <Button label="BBBB" />
        </header>
    );
}

Header.JS = JS;
Header.PKG = PKG;

export default Header;
