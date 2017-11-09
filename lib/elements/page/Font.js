import React from 'react';
import PropTypes from 'prop-types';

import Style from './Style';

function Font({fonts = []}) {
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

Font.propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        font: PropTypes.number,
        weight: PropTypes.string,
        style: PropTypes.string
    })).isRequired
};

export default Font;
