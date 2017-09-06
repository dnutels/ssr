import React from 'react';

import {SVG} from '../../common/elements/svg/';

const Logo = '<use xlink:href="#logo" />';

export default function Header(props) {
    const {title} = props;

    return (
        <header>
            <SVG width="61" height="22" href="logo" />
        </header>
    );
}
