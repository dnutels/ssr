import React, {Children} from 'react';

export default function Style(props) {
    const {children = ''} = props;

    return (
        <style {...props}>{children}</style>
    );
}
