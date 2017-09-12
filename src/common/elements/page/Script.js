import React, {Children} from 'react';
import PropTypes from 'prop-types';

function Script(props) {
    const {children, hidden, ...rest} = props;
    const html = Children.toArray(children).join('');

    let attrs = children ? {
        dangerouslySetInnerHTML: {
            __html: html
        },
        ...rest
    } : rest;

    return hidden ? null : <script {...attrs}></script>;
}

Script.propTypes = {
    src: PropTypes.string,
    type: PropTypes.string,
    hidden: PropTypes.bool,
};

export default Script;
