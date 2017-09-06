import React, {Children} from 'react';

export default function Style(props) {
    const {children, ...rest} = props;

    let styleProps = children ? {
        dangerouslySetInnerHTML: {
            __html: children
        },
        ...rest
    } : rest;

    return (
        <style {...styleProps}></style>
    );
}
