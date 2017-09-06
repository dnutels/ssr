import React, {Children} from 'react';

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

export default Script;
