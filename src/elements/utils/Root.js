import React, {Children} from 'react';

export default function Root(props) {
    const children = Children.toArray(props.children);
    return children;
}
