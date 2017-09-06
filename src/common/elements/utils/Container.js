import React, {Children} from 'react';

export default function Container(props) {
    const {hidden = false} = props;
    const children = Children.toArray(props.children);
    return hidden ? null : children;
}
