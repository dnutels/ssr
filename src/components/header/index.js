import React from 'react';

export default function Header(props) {
    const {title} = props;

    return (
        <header>{title}</header>
    );
}
