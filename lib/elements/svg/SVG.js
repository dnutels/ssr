import React from 'react';

export default function SVG(props) {
    const {href, ...rest} = props;

    let attrs = {
        dangerouslySetInnerHTML: {
            __html: `<use xlink:href="#${href}" />`
        },
        ...rest
    };

    return <svg {...attrs}></svg>;
}
