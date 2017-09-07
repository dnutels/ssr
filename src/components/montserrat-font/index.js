import React from 'react';

import PKG from './package.json';

import light from './inline-assets/fonts/Montserrat/montserrat-light.woff';
import regular from './inline-assets/fonts/Montserrat/montserrat-regular.woff';
import bold from './inline-assets/fonts/Montserrat/montserrat-bold.woff';

const fonts = [
    {name: 'MontserratCrit', font: light, weight: 300, style: 'normal'},
    {name: 'MontserratCrit', font: regular, weight: 400, style: 'normal'},
    {name: 'MontserratCrit', font: bold, weight: 700, style: 'normal'}
];

import {Font}  from '../../common/elements/page/';

function Montserrat(props) {
    const {title} = props;

    return <Font fonts={fonts} />;
}

Montserrat.PKG = PKG;

export default Montserrat;
