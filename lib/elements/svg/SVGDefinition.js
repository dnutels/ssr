import React, {Children} from 'react';

const style = {
    display: 'none',
    visibility: 'hidden',
    fontSize: 0,
    height: 0
};

export default function SVGDefinition(props) {
    const {children, ...rest} = props;
    const html = Children.toArray(children).join('');

    let attrs = children ? {
        dangerouslySetInnerHTML: {
            __html: html
        },
        ...rest
    } : rest;

    return <div style={style} {...attrs}></div>;
}
