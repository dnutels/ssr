import React from 'react';

import Style from './Style';

export default function Font({fonts}) {
    const fontCode = fonts.map(({name, font, weight, style}) => {
        return `
            @font-face {
                font-family: "${name}";
                src: url("${font}") format('woff');
                font-weight: ${weight};
                font-style: ${style};
            }
        `;
    }).join('\n');

    return (
        <Style>{fontCode}</Style>
    );
}
